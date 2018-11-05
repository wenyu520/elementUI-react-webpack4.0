const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    devtool: 'eval-source-map',
    devServer: {
        contentBase: require('path').join(__dirname, "dist"),
        compress: true,
        port: 8088,
        host: "localhost",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {
                        loader: "postcss-loader",//自动加前缀
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['last 5 version']
                                })
                            ]
                        }
                    },
                    {loader: "less-loader"}
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: "style-loader"},
                    {
                        loader: "css-loader",
                    },
                    {loader: "sass-loader"},
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['last 5 version']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: ('assets/img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: ('assets/media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: ('assets/fonts/[name].[hash:7].[ext]')
                }
            }

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./dist/index.html"
        })
    ]
};
