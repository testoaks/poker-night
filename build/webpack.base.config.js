const path = require("path");
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const translateEnvToMode = (env) => {
    if (env === "production") {
        return "production";
    }
    return "development";
};

module.exports = env => {
  let isDevelopment = env === "development";
    return {
        target: "electron-renderer",
        mode: translateEnvToMode(env),
        node: {
            __dirname: false,
            __filename: false
        },
        externals: [nodeExternals()],
        resolve: {
            alias: {
                env: path.resolve(__dirname, `../config/env_${env}.json`)
            },
          extensions: ['.js', '.jsx', '.scss']
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }, {
                    test: /\.module\.s(a|c)ss$/,
                    loader: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: isDevelopment
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment
                            }
                        }
                    ]
                },
                {
                    test: /\.s(a|c)ss$/,
                    exclude: /\.module.(s(a|c)ss)$/,
                    loader: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new FriendlyErrorsWebpackPlugin({clearConsole: isDevelopment}),
            new MiniCssExtractPlugin({
                filename: isDevelopment ? '[name].css' : '[name].[hash].css',
                chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
            })
        ]
    };
};
