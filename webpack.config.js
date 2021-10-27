const path              = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MainPath     = path.resolve(__dirname)
const BuildPath    = path.resolve(MainPath, 'build')
const SrcPath      = path.resolve(MainPath, 'src')
const TemplatePath = path.resolve(SrcPath, 'react.template.html')
const EntryPath    = path.resolve(SrcPath, 'index.ts')

module.exports = {
    entry: EntryPath,
    mode: 'development',
    output: {
        path: BuildPath,
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.less$|\.css/i,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.js$|\.jsx|\.ts|\.tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        'presets': [
                            '@babel/preset-react',
                            [
                                '@babel/preset-typescript',
                                {
                                    isTSX: true,
                                    allExtensions: true
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: TemplatePath
        })
    ],
    devServer: {
        contentBase: BuildPath,
        port: 3000
    }
}