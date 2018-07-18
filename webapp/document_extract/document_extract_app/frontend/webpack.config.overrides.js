const merge = require('webpack-merge');

const webpack_overrides = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader" // has separate config, see postcss.config.js nearby
        ]
      }
    ]
  },
};



module.exports = function(webpack_config){
  const webpack_config_merged = merge.smartStrategy({
    'module.loaders': 'replace'
  })(webpack_config, webpack_overrides);
  console.log(webpack_config_merged)
  //return webpack_config_merged;
  return webpack_config
}
