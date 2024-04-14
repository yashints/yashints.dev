import React from 'react';
import Thumbnail from 'Static/me.jpg';
import {
  url,
  rootUrl,
  defaultTitle,
  defaultDescription,
  social,
  socialLinks,
  address,
  contact,
  legalName,
  foundingDate,
  logo,
  author,
} from 'Data';

export const SEO = ({
  title,
  type,
  description,
  articleBody,
  datePublished,
  cover,
  canonical_url = '',
  location = '',
}) => {
  const structuredDataArticle = `{
		"@context": "http://schema.org",
		"@type": "${type}",
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": "https://google.com/article"
		},
		"headline": "${description}",
		"image": {
			"@type": "imageObject",
			"url": "${cover ? `${url}${cover}` : `${url}${Thumbnail}`}",
			"height": "600",
			"width": "800"
		},
		"datePublished": "${datePublished}",
		"dateModified": "${datePublished}",
		"author": {
			"@type": "Person",
			"name": "${author}"
		},
		"articleBody": "${articleBody}",
		"publisher": {
			"@type": "Organization",
			"name": "${author}",
			"logo": {
				"@type": "ImageObject",
				"url": "${logo}"
			}
		},
		"description": "${description}",
		"url": "${url}${location}/?ref=${rootUrl}"
	}`;

  const structuredDataOrganization = `{ 
		"@context": "http://schema.org",
		"@type": "${type}",
		"legalName": "${legalName}",
		"url": "${url}",
		"logo": "${logo}",
		"foundingDate": "${foundingDate}",
		"founders": [{
			"@type": "Person",
			"name": "${legalName}"
		}],
		"contactPoint": [{
			"@type": "ContactPoint",
			"email": "${contact.email}",
			"telephone": "${contact.phone}",
			"contactType": "customer service"
		}],
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "${address.city}",
			"addressRegion": "${address.region}",
			"addressCountry": "${address.country}",
			"postalCode": "${address.zipCode}"
		},
		"sameAs": [
			"${socialLinks.twitter}",
			"${socialLinks.github}",			
			"${socialLinks.linkedin}",			
			"${socialLinks.github}"
		]
  	}`;

  return (
    <>
      <meta name="description" content={description || defaultDescription} />
      <meta
        name="image"
        content={cover ? `${url}${cover}` : `${url}${Thumbnail}`}
      />

      <meta property="og:url" content={`${url}${location}/?ref=${rootUrl}`} />
      <meta
        property="og:type"
        content={type === 'NewsArticle' ? 'NewsArticle' : 'website'}
      />
      <meta
        property="og:title"
        content={title ? `${defaultTitle} | ${title}` : defaultTitle}
      />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta
        property="og:image"
        content={cover ? `${url}${cover}` : `${url}${Thumbnail}`}
      />
      <meta property="fb:app_id" content={social.facebook} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={socialLinks.twitter} />
      <meta name="twitter:site" content={social.twitter} />
      <meta
        name="twitter:title"
        content={title ? `${defaultTitle} | ${title}` : defaultTitle}
      />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta
        name="twitter:image:src"
        content={cover ? `${url}${cover}` : `${url}${Thumbnail}`}
      />
      <meta name="monetization" content="$ilp.uphold.com/XQeUdN6MjiGz" />
      <script type="application/ld+json">
        {type === 'NewsArticle'
          ? structuredDataArticle
          : structuredDataOrganization}
      </script>
      <link rel="publisher" href={socialLinks.google} />
      <link rel="canonical" href={canonical_url} />
      <title>{title ? `${author} | ${title}` : author}</title>
    </>
  );
};
