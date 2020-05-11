const path = require("path");

const config = {
    entry: {
        vendor: ["@babel/polyfill", "react"],
        index: ["./src/views/index.jsx"]
    },
    output: {
        path: path.resolve(__dirname, "src", "public"),
        filename: "[name].js",
        globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          // for any file with a suffix of js or jsx
          test: /\.(js|jsx)$/,
          // ignore transpiling JavaScript from node_modules as it should be that state
          exclude: /node_modules/,
          // use the babel-loader for transpiling JavaScript to a suitable format
          use: ["babel-loader"],
        },
      ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*", ".scss"]
    }
};

module.exports = config;