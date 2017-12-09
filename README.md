# scripton
[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

### Installation

spotify requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd scripton
$ npm install
$ npm run dev
```

For production environments...

```sh
$ npm install
$ npm start
```

### Generating Docs
```sh
npm run apidoc-api
npm run apidoc-adminApi
npm run apidoc-publicApi

```
### Checking Docs
http://localhost:5000/public/api/docs
http://localhost:5000/public/admin-api/docs
http://localhost:5000/public/public-api/docs

