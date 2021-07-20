import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

/**
 * Seo provides a component for outputting metadata tags in the
 *
 * HTML head element using react helmet.
 *
 * Falls back to site default meta if none provided
 *
 * Props:
 *
 * lang - adds language attribute to html tag
 *
 * title - adds title element
 *
 * metaDescruption - adds a description of the webpage
 */
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

  // markup
  return (
    <Helmet
      htmlAttributes={{ lang: props.lang || site.siteMetadata.lang }}
      title={props.title || site.siteMetadata.title}
      titleTemplate={props.title
        ? `${props.title.replace(/\w/, firstLetter => firstLetter.toUpperCase())} | ${defaultTitle}`
        : `${defaultTitle}`}
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
