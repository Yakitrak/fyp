const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const plugins = [
    new HtmlWebPackPlugin({
        chunks: ['index'],
        template: '!!html-loader!client/src/template.ejs',
        filename: 'index/indexDashboard.ejs',
    }),
    new HtmlWebPackPlugin({
        chunks: ['welcome'],
        template: '!!html-loader!client/src/template.ejs',
        filename: 'index/indexWelcome.ejs',
    }),
];

module.exports = {
    mode: 'development',
    entry: {
        indexDashboard: path.join(__dirname, 'client/src/indexDashboard.jsx'),
        indexWelcome: path.join(__dirname, 'client/src/indexWelcome.jsx'),
    },
    output: {
        path: path.join(__dirname, 'client/public'),
        filename: '[name]/js/bundle.js',
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'client/src')],
        extensions: ['.js', '.jsx', '.json', '.mjs', '.web.jsx', 'web.js'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'env',
                        'react',
                        'stage-1',
                    ],
                },
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.svg$/,
                loader: 'svg-loader',
            },
        ],
    },
    plugins: plugins,
};
