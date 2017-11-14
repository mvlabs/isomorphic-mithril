const autoprefixer = require('autoprefixer');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const path = require('path');
const precss = require('precss');
const ReloadServerPlugin = require('reload-server-webpack-plugin');

const isProduction = process.argv.indexOf('-p') !== -1;

const config = {
    name: 'client',
    target: 'web',
    context: path.resolve(__dirname, './'),
    entry: {
        './assets/js/app': './app/index.js',
        './assets/css/style': './styles/style.scss'
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].[hash].min.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return isProduction ? [
                                        precss,
                                        autoprefixer,
                                        cssnano
                                    ] : [];
                                }
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['assets/css/*.*', 'assets/js/*.*']),
        new ExtractTextPlugin('[name].[hash].min.css'),
        function () {
            this.plugin('done', (stats) => {
                const hash = { hash: stats.hash };
                fs.writeFileSync(
                    path.join(__dirname, './', 'stats.json'),
                    JSON.stringify(hash)
                );
                const filesToClean = fs.readdirSync(path.join(__dirname, './assets/css')).filter(file => file.match(/.*\.(js)/ig));
                if (filesToClean.length) fs.unlink(path.join(__dirname, `./assets/css/${filesToClean[0]}`));
            });
        }
    ]
};

// Development mode
if (!isProduction) {
    config.plugins.push(new ReloadServerPlugin({
        script: './server.js'
    }));
    config.plugins.push(new BrowserSyncPlugin({
        host: 'localhost',
        port: 4000,
        proxy: 'http://localhost:3000/'
    }));
}

module.exports = config;