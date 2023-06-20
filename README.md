# micro-frontend
Micro-frontend web app

## Create micro-frontend application

    npx create-mf-app

## Config `webpack.config.js`

Add ModuleFederationPlugin in __counter app__ to the plugins array with the following configuration:

```
plugins: [
    new ModuleFederationPlugin({
      name: "counter",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./Counter": "./src/Counter",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
],
```

Note:
1. name: Name of the remote app
2. filename: Entry point(remoteEntry.js) for the counter app.
3. remotes: Add remotes entry here (relevant for the container)
4. exposes: All the component names that you want to expose to the container app.
5. shared: container all the dependencies that you want to share between the container and the counter app.

Update the webpack.config.js file inside the Container app.

```
plugins: [ // This is important part
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      remotes: {
        counter: "counter@http://localhost:8081/remoteEntry.js",
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
],
```

The remote objects will have to define all the entry points exposed from remote apps, remotes entry has the following structure:

    { "app-name": "name@<remote-host>/remoteEntry.js" }

## Import component

    import { Counter } from 'counter/Counter';

## How to run:

1. Cd to each frontend
2. Build project with `npm build`
3. Start all frontend with `npm start`
