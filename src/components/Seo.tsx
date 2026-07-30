import { Helmet } from 'react-helmet-async';

interface SeoProps { title: string; description: string; image?: string }

export function Seo({ title, description, image }: SeoProps) {
  const fullTitle = title === '岛屿手记' ? title : `${title} · 岛屿手记`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
}
