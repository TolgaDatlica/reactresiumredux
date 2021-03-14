const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlTagsPlugin = require("html-webpack-tags-plugin");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';
module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    context: __dirname,
    entry: './src/index.js',
    resolve: {
        extensions: [".js", ".jsx"],
    },
    externals: {
        cesium: "Cesium",
    },
    /* ...entry and resolve options */
    output: {
        path: path.join(__dirname, "build"),
    },
    devServer: {
        historyApiFallback: true
    },
    /* ...entry, resolve and output options */
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                loader: "babel-loader",
                options: {
                    presets:[["@babel/preset-env", { "targets": "defaults" }]],
                    plugins: [
                        "babel-plugin-transform-class-properties"
                    ],
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                  // ... other loaders
                  {
                    loader: require.resolve('babel-loader'),
                    options: {
                      // ... other options
                      plugins: [
                        // ... other plugins
                        isDevelopment && require.resolve('react-refresh/babel'),
                      ].filter(Boolean),
                    },
                  },
                ],
              },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            CESIUM_BASE_URL: JSON.stringify("/cesium"),
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "node_modules/cesium/Build/Cesium",
                    to: "cesium",
                },
                // {
                //     from: "src/images",
                //     to: "images"
                // }
            ],
        }),
        new HtmlTagsPlugin({
            append: false,
            tags: ["cesium/Widgets/widgets.css", "cesium/Cesium.js"],
        }),
        isDevelopment && new webpack.HotModuleReplacementPlugin(),
        isDevelopment && new ReactRefreshWebpackPlugin(),

    ],
}
