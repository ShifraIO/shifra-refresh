# Shifra

This is a project which has been forked off the minimal Gatsby starter which includes Bulma and Storybook. It leverages the Gatsby Contentful plugin to pull in the site content. Styling is done primarily with scss.

## Features  

* Storybook
* Bulma (with font-awesome icons)
* Contentful
* (S)CSS modules
* ESLint
* Jest



## Install

Clone the repository and install dependencies

```sh
git clone https://github.com/ShifraIO/shifra-refresh.git
yarn
```

Please note that this project uses yarn selective dependency resolutions you **must** use yarn as an npm client.

Before running the project, please update the .env file with the correct Contentful API Key and ID.
You can copy the example file like so;

```sh
cp .envexample .env
```

## Useful yarn commands

Execute the web application dev-server (on port 8000):

```sh
yarn develop
```

Run the Storybook dev-server (on port 9001):

```sh
yarn storybook
```

Execute the tests:

```sh
yarn test
```

Run the linter:

```sh
yarn lint
```

Reformat the code:

```sh
yarn format
```

Build the web application in production mode:

```sh
yarn build
```

Run a local HTML server to test the web application in production mode (on port 9000):

```sh
yarn serve
```

## Important Notes

When adding new dependencies, please be aware that the current version of gatsby does **not** support ES6 and above, as it does not implement babel. The code will run fine during development, but it **will not** compile on the production build task.

If you really need a feature included in a new dependency, please make sure it is **pre-compiled** to ES5.

## Deployment

This project is built on a framework (GatbsyJS) that build static websites. This means all of the content and pages are programmatically generated as static files at compile time. This means that when you run `yarn server` the gatsby cli will fetch any content it needs and generate the pages with this. Be aware that you **need** an internet connection for the files to be generated.

As this is a static website, it can be hosted on any service that offers static website hosting. This particular project takes advantage of Netlify.

Webhooks are used to trigger deployments when the **master** branch is updated. Netlify can also be configured to build different versions of the site from different branches (test, develop, staging, etc).

# Gatsby

Gatsby is a framework for building static websites. It uses GraphQL to fetch data and programmatically build out websites. Gatsby can fetch data from markdown files, json, and even external API's.

## Useful Links

* https://www.gatsbyjs.org/
* https://www.gatsbyjs.org/docs/
* https://github.com/gvaldambrini/gatsby-starter-bulma-storybook

# Bulma

Bulma is a no JavaScript CSS framework that takes a mobile first approach to development.
By extending the provided styles it provides a great framework for mobile friendly views that also look great on desktop clients.

## Useful Links

* https://bulma.io/
* https://bulma.io/documentation/

# Contentful

Contentful is a headless Content Management System (CMS). It allows complete freedom of data structures and types and provides a GraphQL endpoint that makes fetching data incredibly easy.

Contentful is used in Shifra to manage the different content and menu options as well as the different languages it supports. It is worth reviewing the different types in the Shifra Contentful project and how they relate to the GraphQL queries included in this project.

## Useful Links

* https://www.contentful.com/
* https://www.contentful.com/r/knowledgebase/contentful-101/
* https://www.contentful.com/guides/

# GraphQL

GraphQL is an alternative to RESTful API's. It provides the front-end code complete control of the data that it requests. No RESTful endpoints need to be built for different data, as each request is made to the GraphQL endpoint using a GraphQL specific query language.

GraphQL is the main method used in the project for fetching the content.

## Useful Links

* https://graphql.org/
* https://graphql.org/learn/

# Netlify

Netlify is a super simplistic static website hosting service.

## Useful Links

* https://www.netlify.com/
* https://www.netlify.com/docs/

# React

React is a component focussed JavaScript library for building user interfaces. GatsbyJS is a static website generator that is built around React.

## Useful Links

* https://reactjs.org/
* https://reactjs.org/docs/
* https://reactjs.org/docs/getting-started.html
* https://reactjs.org/tutorial/tutorial.html
