module.exports = {
  entry: "./lib/mario_bros_classic.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
  module: {
   loaders: [
     {
       test: /\.scss$/,
       loaders: ["style", "css", "sass"]
     }
   ]
 }
};
