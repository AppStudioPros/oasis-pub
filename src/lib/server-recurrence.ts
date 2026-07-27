/**
 * Server-side recurrence utility — shared between homepage and event detail page.
 * Returns the next upcoming occurrence of a recurring event as a Date.
 * Advances the original UTC timestamp by whole days to preserve exact ET time-of-day.
 */

type RecurrenceRule = {
  freq?: string;
  days?: string[];
  monthly_type?: string;
  nth?: number;
  nth_day?: string;
  until?: string;
};

const DAY_CODE: Record<string, number> = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };

function etDayOfWeek(d: Date): number {
  const name = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "America/New_York" }).format(d);
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(name);
}

function etComponents(d: Date): { y: number; mo: number; day: number } {
  const s = d.toLocaleString("sv-SE", {
    timeZone: "America/New_York",
    year: "numeric", month: "2-digit", day: "2-digit",
  });
  const [y, mo, day] = s.split("-").map(Number);
  return { y, mo, day };
}

function candidateAt(base: Date, tY: number, tM: number, tD: number): Date {
  const orig = etComponents(base);
  const dayDiff = Math.round(
    (Date.UTC(tY, tM - 1, tD) - Date.UTC(orig.y, orig.mo - 1, orig.day)) / (24 * 60 * 60 * 1000)
  );
  return new Date(base.getTime() + dayDiff * 24 * 60 * 60 * 1000);
}

export function getNextOccurrence(
  startDateISO: string,
  isRecurring: boolean,
  rule: RecurrenceRule | null,
  from: Date = new Date()
): Date {
  const base = new Date(startDateISO);
  if (!isRecurring || !rule) return base;

  const untilDate = rule.until
    ? new Date(rule.until.split("-").join("-") + "T23:59:59-04:00")
    : null;

  const MS = 24 * 60 * 60 * 1000;

  if (rule.freq === "weekly" && rule.days?.length) {
    const daysElapsed = Math.max(0, Math.floor((from.getTime() - base.getTime()) / MS));
    const searchFrom = new Date(base.getTime() + daysElapsed * MS);
    for (let i = 0; i <= 13; i++) {
      const cand = new Date(searchFrom.getTime() + i * MS);
      if (rule.days.some((d) => DAY_CODE[d] === etDayOfWeek(cand)) && cand >= from) {
        if (untilDate && cand > untilDate) return base;
        return cand;
      }
    }
  }

  if (rule.freq === "monthly") {
    const { y: nowY, mo: nowMo } = etComponents(from);

    if (rule.monthly_type === "nth_weekday" && rule.nth && rule.nth_day) {
      const targetDay = DAY_CODE[rule.nth_day];
      for (let offset = 0; offset <= 12; offset++) {
        const mo2 = ((nowMo - 1 + offset) % 12) + 1;
        const y2 = nowY + Math.floor((nowMo - 1 + offset) / 12);
        let count = 0;
        for (let d = 1; d <= 31; d++) {
          const t = new Date(Date.UTC(y2, mo2 - 1, d, 12, 0, 0));
          if (t.getUTCMonth() !== mo2 - 1) break;
          if (etDayOfWeek(t) === targetDay) {
            count++;
            if (count === rule.nth) {
              const found = candidateAt(base, y2, mo2, d);
              if (found >= from) {
                if (untilDate && found > untilDate) return base;
                return found;
              }
              break;
            }
          }
        }
      }
      return base;
    }

    // day_of_month
    const startET = etComponents(base);
    const thisMonth = candidateAt(base, nowY, nowMo, startET.day);
    if (thisMonth >= from) {
      if (untilDate && thisMonth > untilDate) return base;
      return thisMonth;
    }
    const nextMo = nowMo === 12 ? 1 : nowMo + 1;
    const nextY = nowMo === 12 ? nowY + 1 : nowY;
    const nextMonth = candidateAt(base, nextY, nextMo, startET.day);
    if (untilDate && nextMonth > untilDate) return base;
    return nextMonth;
  }

  return base;
}
