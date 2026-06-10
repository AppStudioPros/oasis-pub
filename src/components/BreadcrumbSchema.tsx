interface Crumb {
  name: string;
  url: string;
}

export default function BreadcrumbSchema({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.name,
            item: crumb.url,
          })),
        }),
      }}
    />
  );
}
