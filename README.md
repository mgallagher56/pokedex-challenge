
<p align="center">
    <img alt="Gatsby" src="https://www.nicepng.com/png/detail/228-2285786_pokedex-kanto-pokedex-de-kanto.png" width="300" />
  </a>
</p>
<h1 align="center">
  Gatsby Pokedex Project
</h1>

<h3>View live project at <a href="https://mgr-dev.tech/">https://mgr-dev.tech/ </a>

## Get started

 -  **Clone the repo**

    Clone the repo using git clone from the command line

    ```shell
    # clone github repo
    git clone git@github.com:mgallagher56/pokedexchallenge.git
    ```

 -  **Install dependencies**

    Navigate into your new repo’s directory and install the gatsby cli  and  dependencies via npm.

    If you need to install npm, you can find instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

    ```shell
    npm install -g gatsby-cli
    npm install
    ```
 -  **Set up environment variables**

    Create .env files in the root directory of your project: one for development and one for production.


    ```shell
    touch .env.development
    touch .env.production
    ```
    Populate each your site url:
    URL=https://yoursite.com

 -  **Start development environment**

    Start up the gatsby development server

    ```shell
    gatsby develop
    ```
    If you weren’t able to install the Gatsby command line interface globally, you can start your development server using the following command instead:

    ```shell
    npm run develop
    ```

 -  **Open the code and start customizing!**

    The project is now running and can be viewed at http://localhost:8000!

 -  **Serve the production build of your site for testing**
	Stop the development server if it's still running.

	gatsby build creates a production build of your site and outputs the built static files into the `public` directory.

     ```shell
    gatsby build
    # if you didn't install gatsby cli
    npm run build
    ```
    gatsby serve starts the production sever. You can now view your site at http://localhost:9000.
    ``` shell
    gatsby serve
    # if you didn't install gatsby cli
    npm run serve
    ```
	
## Testing
	
    **Unit Testing**
    Start test watcher. Test will be run as files are edited
    ```shell
    npm run test
    ```
    Press 'a' while the test watcher is running to perform all available test
	
    **End-to-End Testing**
    Start production server and open Cypress Test UI
    ```shell
    npm run build && npm run serve && npm run cypress:open
    ```
    
    Start production server and Run Cypress test from command line
    ```shell
    npm run build && npm run server-start
    ```
	
## More info on using Gatsby

    For more information on working with Gatsby, view their docs [here](https://www.gatsbyjs.com/docs/)

## Project Dependecies
	- @material-ui/core
	- @material-ui/lab
	- dotenv
	- gatsby
	- gatsby-plugin-gatsby-cloud
	- gatsby-plugin-image
	- gatsby-plugin-manifest
	- gatsby-plugin-material-ui
	- gatsby-plugin-offline
	- gatsby-plugin-react-helmet
	- gatsby-plugin-sharp
	- gatsby-plugin-sitemap
	- gatsby-source-filesystem
	- gatsby-theme-material-ui
	- gatsby-transformer-sharp
	- react
	- react-dom
	- react-helmet
	- use-debounce

	**Dev Dependencies**
	- @testing-library/cypress
	- @testing-library/jest-dom
	- @testing-library/react"
	- axe-core
	- babel-jest
	- babel-preset-gatsby
	- cypress
	- cypress-audit
	- cypress-axe
	- identity-obj-proxy
	- jest
	- postcss
	- react-test-renderer
	- start-server-and-test
	- trim
	- trim-newlines
