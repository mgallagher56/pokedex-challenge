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
    'gatsby-plugin-material-ui',
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
      options: {
        allPageHeaders: [
          'Cache-Control: max-age=31536000',
          'Permissions-Policy: geolocation=(), midi=(), notifications=(), push=(), sync-xhr=(), microphone=(), camera=(), magnetometer=(), gyroscope=(), speaker=(), vibrate=(), fullscreen=(), payment=()'
        ],
        mergeCachingHeaders: true
      }
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Pokedex',
        theme_color: '#DC092D',
        background_color: '#FDF0D5',
        icon: 'src/images/pokedex-icon.png',
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
    },
    'gatsby-plugin-offline'
  ]
}
