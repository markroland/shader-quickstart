const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          'glslify-import-loader',
          'raw-loader',
          'glslify-loader'
        ],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true
  },
  resolve: {
    extensions: ['.js', '.glsl', '.vs', '.fs', '.vert', '.frag']
  },
  mode: 'development'
};