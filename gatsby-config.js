require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    siteUrl: process.env.URL,
    title: 'Marc\'s Pokedex',
    description: 'A list of Pokemon and their information',
    lang: 'en'
  },
  plugins: [
    'gatsby-plugin-material-ui', // provide styled component library for quick prototying
    {
      resolve: 'gatsby-plugin-gatsby-cloud', // provides compatibility and options for gatsby cloud hosting
      options: {
        allPageHeaders: [
          "Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; script-src 'self' https://mgr-dev.tech 'unsafe-inline';",
          'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
          'Permissions-Policy: geolocation=(), midi=(), notifications=(), push=(), sync-xhr=(), microphone=(), camera=(), magnetometer=(), gyroscope=(), speaker=(), vibrate=(), fullscreen=(), payment=()'
        ]
      }
    },
    'gatsby-plugin-image', // provides support for automatic responsive images
    'gatsby-plugin-react-helmet', // provides support for rendering metadata in head tag
    'gatsby-plugin-sitemap', // provides support for automatic responsive images
    {
      resolve: 'gatsby-plugin-manifest', // provide manifest information for PWA functionalty
      options: {
        name: 'Pokedex',
        theme_color: '#002984',
        background_color: '#FDF0D5',
        icon: 'src/images/pokedex-icon.png',
        display: 'standalone',
        icon_options: {
          purpose: 'any maskable'
        }
      }
    },
    'gatsby-plugin-sharp', //  enables images to be used by Gatsby Image
    'gatsby-transformer-sharp', //  enables images to be used by Gatsby Image
    {
      resolve: 'gatsby-source-filesystem', // enables use of local images in queries
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-plugin-offline', // provide offline support for PWA functionalty
      options: {
        precachePages: ['/pokemon/*']
      }
    }
  ]
}
