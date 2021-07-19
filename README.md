
<p align="center">
    <img alt="Pokedex" src="https://www.nicepng.com/png/detail/228-2285786_pokedex-kanto-pokedex-de-kanto.png" width="300" />
  </a>
</p>
<h1 align="center">
  Gatsby Pokedex Project
</h1>

## Get started

1.  **Clone the repo**

    Clone the repo using git clone from the command line

    ```shell
    # clone github repo
    git clone git@github.com:mgallagher56/pokedexchallenge.git
    ```

2.  **Install dependencies**

    Navigate into your new repo’s directory and install the gatsby cli  and  dependencies via npm.
    
    If you need to install npm, you can find instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

    ```shell
    npm install -g gatsby-cli
    npm install
    ```
3.  **Set up environment variables**

    Create .env files in the root directory of your project: one for development and one for production.
     

    ```shell
    touch .env.development
    touch .env.production
    ```
    Populate each your site url:
    URL=https://yoursite.com
    
4.  **Start development environment**

    Start up the gatsby development server

    ```shell
    gatsby develop
    ```
    If you weren’t able to install the Gatsby command line interface globally, you can start your development server using the following command instead:
    
    ```shell
    npm run develop
    ```
    
5.  **Open the code and start customizing!**

    The project is now running and can be viewed at http://localhost:8000!

6.  **Serve the production build of your site for testing**
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

	 **More info on using Gatsby**

    For more information on working with Gatsby, view their docs [here](https://www.gatsbyjs.com/docs/)
