require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    siteUrl: process.env.URL,
    title: 'pokedex-challenge'
  },
  plugins: [
    'gatsby-plugin-material-ui',
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
      options: {
        allPageHeaders: [
          'Permissions-Policy: geolocation=(), midi=(), notifications=(), push=(), sync-xhr=(), microphone=(), camera=(), magnetometer=(), gyroscope=(), speaker=(), vibrate=(), fullscreen=(), payment=()'
        ]
      }
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Pokedex Challenge',
        theme_color: '#CD5241',
        background_color: '#EEDE7B',
        icon: 'src/images/icon.png',
        display: 'standalone',
        icon_options: {
          purpose: 'any maskable'
        }
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    }
  ]
}
