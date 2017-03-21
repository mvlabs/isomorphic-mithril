const autoprefixer = require('autoprefixer');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const path = require('path');
const precss = require('precss');
const ReloadServerPlugin = require('reload-server-webpack-plugin');

const prod = process.argv.indexOf('-p') !== -1;


const cleanAssets = (startPath, filter) => {
    if (!fs.existsSync(startPath)) {
        console.log('no dir ', startPath);
        return;
    }

    const files = fs.readdirSync(startPath);

    files.map((file) => {
        const filename = path.join(startPath, file);

        if (filename.indexOf(filter) >= 0) {
            fs.unlinkSync(filename);
            console.log('-- cleaned: ', filename);
        }
    });
};


const config = {
    name: 'client',
    target: 'web',
    context: path.resolve(__dirname, './'),
    entry: {
        './assets/js/app': './app/index.js',
        './assets/css/styles': './styles/style.scss'
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
                                    return [
                                        precss,
                                        autoprefixer,
                                        cssnano
                                    ];
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
        function() {
            cleanAssets('./assets/css/', '.css');
            cleanAssets('./assets/js/', '.js');
        },
        new ExtractTextPlugin('[name].[hash].min.css'),
        function() {
            this.plugin('done', (stats) => {
                const hash = { hash: stats.hash };
                fs.writeFileSync(
                    path.join(__dirname, './', 'stats.json'),
                    JSON.stringify(hash)
                );

                cleanAssets(path.join(__dirname, './assets/css/'), '.js');
            });
        }
    ]
};

if (!prod) {
    config.plugins.push(new ReloadServerPlugin({ script: './server.js' }));
    config.plugins.push(new BrowserSyncPlugin({
        host: 'localhost',
        port: 4000,
        proxy: 'http://localhost:3000/'
    }));
}

module.exports = config;