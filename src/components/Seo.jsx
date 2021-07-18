import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = (props) => {
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
      htmlAttributes={{ lang: props.lang || site.siteMetadata.lang }}
      title={props.title || site.siteMetadata.title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: 'description',
          content: props.metaDescription || site.siteMetadata.description
        },
        {
          property: 'og:title',
          content: props.title || site.siteMetadata.title
        },
        {
          property: 'og:description',
          content: props.metaDescription || site.siteMetadata.description
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
