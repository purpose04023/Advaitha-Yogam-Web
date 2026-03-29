import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, type = 'website', article = false }) => {
  const fullTitle = `${title} | Advaitha Yogam`;
  const siteUrl = 'https://advaita-yogam-web.render.com';
  const fullUrl = `${siteUrl}${url}`;

  const schemaMarkup = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": "Advaitha Yogam"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Advaitha Yogam",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    }
  } : {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": fullTitle,
    "description": description
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* GEO / Generative Engine Optimization */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
    </Helmet>
  );
};

export default SEO;
