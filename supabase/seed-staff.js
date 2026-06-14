// Seed script for oasis_staff table
// Run with: SUPABASE_SERVICE_KEY=<your-key> node supabase/seed-staff.js
// Or set SUPABASE_URL and SUPABASE_SERVICE_KEY in environment

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://hwzndsbkzabfcfbnvzge.supabase.co';
// Do NOT hardcode the service key. Set SUPABASE_SERVICE_KEY env var before running.
const serviceRoleKey = process.env.SUPABASE_SERVICE_KEY;

if (!serviceRoleKey) {
  console.error('Error: SUPABASE_SERVICE_KEY env var is required.');
  console.error('Run: SUPABASE_SERVICE_KEY=your-key node supabase/seed-staff.js');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

const placeholderStaff = [
  {
    name: 'Staff Member',
    role: 'Bartender',
    bio: 'Bio coming soon.',
    photo_url: null,
    display_order: 1,
    active: true,
  },
  {
    name: 'Staff Member',
    role: 'Door',
    bio: 'Bio coming soon.',
    photo_url: null,
    display_order: 2,
    active: true,
  },
  {
    name: 'Staff Member',
    role: 'Sound Engineer',
    bio: 'Bio coming soon.',
    photo_url: null,
    display_order: 3,
    active: true,
  },
];

async function seed() {
  console.log('Seeding oasis_staff...');
  const { data, error } = await supabase
    .from('oasis_staff')
    .insert(placeholderStaff)
    .select();

  if (error) {
    console.error('Error seeding staff:', error.message);
    process.exit(1);
  }

  console.log('Seeded', data.length, 'staff members:', data.map(s => s.name));
  process.exit(0);
}

seed();
