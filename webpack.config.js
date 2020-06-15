const path = require("path");
module.exports = {
  mode: "production",
  entry: {
    "js/main": "./js/main.js",
    "js/d3ForceGraphSimulation": "./js/d3ForceGraphDom.js",
    "js/d3ForceGraphDom": "./js/d3ForceGraphSimulation.js",
    "js/worker": "./js/worker.js"
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  "targets": {
                    "node": "current"
                  }
                }]
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties"
              ]
            }
          }
        ]
      }
    ]
  },

  optimization: {
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      cacheGroups: {
        default: false 
      }
    }
  }
};