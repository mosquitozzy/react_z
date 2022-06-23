const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式
module.exports = {
    entry: path.join(__dirname, './src/index.tsx'), // 入口文件
    // 打包文件出口
    output: {
        filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
        path: path.join(__dirname, './dist'), // 打包结果输出路径
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: '/' // 打包后文件的公共前缀路径
    },
    cache: {
        type: 'filesystem', // 使用文件缓存
    },
    module: {
        rules: [
            {
                include: [path.resolve(__dirname, './src')], // 只对项目src文件的ts,tsx进行loader解析
                test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
                use: ['thread-loader', 'babel-loader']
            },
            {
                test: /.(css|scss)$/, //匹配 css\scss 文件
                include: [path.resolve(__dirname, './src')],
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /.less$/, //匹配 css\scss 文件
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                paths: [
                                    path.resolve(__dirname, './src'),
                                    path.resolve(__dirname, './node_modules/antd')
                                ],
                                javascriptEnabled: true
                            }
                        }
                    }

                ]
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts', '.css', 'scss'],
        alias: {
            '@': path.join(__dirname, './src')
        },
        modules: [path.resolve(__dirname, './node_modules')],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'), // 模板取定义root节点的模板
            inject: true, // 自动注入静态资源
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css' // 加上[contenthash:8]
        }),
    ]
}