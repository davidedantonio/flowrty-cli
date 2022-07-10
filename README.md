# flowrty-cli

Flowrti CLI is an utility that help you to generate your Flowrty project. This mean that you can easily:

- Generate a MFE App with webpack 5 Module Federation Plugin
- Update your dependencies

## Install

If you want to use `flowrty-cli` you must first install globally on your machine:

```
$ npm install -g flowrty-cli
```

## Usage

```
Generate Flowrty projects and utilities:

  flowrty-cli [command]

Command
  generate:mfe         Generate a ready to use Flowrty React Project
  generate:ms          Generate a ready to use Flowrty Fastify Project
```

## Generate an MFE App

Generate a new Flowrty MFE project run following command

```
$ flowrty-cli generate:project
```

At this point further information will be asked:

- **Name**: The project name. This will also be the name of the project directory.
- **Description**: A short description of your MFE app.
- **Author**: The project author.
- **MFE container name**: The Docker Container name of your application.
- **MFE name**: The Webpack 5 namespace that will be used.
- **Port**: The port on which the application will be exposed.
- **Application Title**: The application Title.

After providing these information the entire application skeleton will be created for you. Simply run

```
$ cd /your-wonderful-application
$ npm install
$ npm run dev
```

or if you want use docker

```
$ docker-compose up -d
```

### Project Structure

By default `flowrty-cli` generate a project structured in this way:

```
flowrty-project
├── dev.sh
├── docker-compose.yml
├── package.json
├── public
│   └── index.ejs
├── README.md
├── src
│   ├── App.js
│   ├── bootstrap.js
│   └── index.js
└── webpack.config.js
```

# License

Licensed under [MIT](./LICENSE).