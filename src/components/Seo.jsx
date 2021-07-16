import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function Seo ({ metaDescription, meta, lang, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title,
            description,
            lang
          }
        }
      }
    `
  )

  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{ lang: lang || site.siteMetadata.lang }}
      title={title || site.siteMetadata.title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: 'description',
          content: metaDescription || site.siteMetadata.description
        },
        {
          property: 'og:title',
          content: title || site.siteMetadata.title
        },
        {
          property: 'og:description',
          content: metaDescription || site.siteMetadata.description
        },
        {
          name: 'viewport',
          content: 'minimum-scale=1, initial-scale=1, width=device-width'
        },
        {
          property: 'og:type',
          content: 'website'
        }
      ]}
    />
  )
}

export default Seo
