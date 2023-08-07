import "webpack-dev-server";

import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

import { environment } from "./src/environment";

interface Argv {
    mode: "production" | "development" | "none";
}

const config = (env: unknown, argv: Argv): webpack.Configuration => {
    const publicPath = "/";

    const plugins: webpack.WebpackPluginInstance[] = [
        new HtmlWebpackPlugin({
            template: "public/index.ejs",
            templateParameters: {
                environmentValues: environment.map((env) => ({ key: env, value: argv.mode === "production" ? `$${env}` : process.env[env] })),
            },
            hash: true,
        }),
    ];

    return {
        entry: {
            "comet-admin": ["./src/polyfills.ts", "./src/pre-loader.ts", "./src/loader.ts"],
        },
        module: {
            rules: [
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: require.resolve("babel-loader"),
                    options: {
                        customize: require.resolve("babel-preset-react-app/webpack-overrides"),
                        babelrc: false,
                        configFile: false,
                        presets: [
                            [
                                require.resolve("babel-preset-react-app"),
                                {
                                    runtime: "automatic",
                                },
                            ],
                        ],
                        plugins: [
                            [
                                "@emotion",
                                {
                                    importMap: {
                                        "@mui/system": {
                                            styled: {
                                                canonicalImport: ["@emotion/styled", "default"],
                                                styledBaseImport: ["@mui/system", "styled"],
                                            },
                                        },
                                        "@mui/material/styles": {
                                            styled: {
                                                canonicalImport: ["@emotion/styled", "default"],
                                                styledBaseImport: ["@mui/material/styles", "styled"],
                                            },
                                        },
                                    },
                                },
                            ],
                        ],
                        cacheDirectory: true,
                        cacheCompression: false,
                    },
                },
                {
                    test: /\.(js|mjs)$/,
                    exclude: /@babel(?:\/|\\{1,2})runtime/,
                    loader: require.resolve("babel-loader"),
                    options: {
                        babelrc: false,
                        configFile: false,
                        compact: false,
                        presets: [[require.resolve("babel-preset-react-app/dependencies"), { helpers: true }]],
                        cacheDirectory: true,
                        sourceMaps: false,
                    },
                },
                {
                    test: /\.css?$/,
                    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    type: "asset/resource",
                },
            ],
        },
        plugins,
        optimization: {
            sideEffects: true,
            usedExports: true,
        },
        resolve: {
            modules: ["node_modules"],
            descriptionFiles: ["package.json"],
            mainFields: ["browser", "module", "main"],
            extensions: ["*", ".mjs", ".js", ".jsx", ".ts", ".tsx"],
            alias: {
                "@src": path.resolve(__dirname, "src/"),
            },
            fallback: {
                "react/jsx-runtime": "react/jsx-runtime.js",
                "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
            },
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name].js",
            chunkFilename: "[id].chunk.js?v=[chunkhash]",
            publicPath,
        },
        devServer: {
            static: {
                directory: path.join(__dirname, "public"),
            },
            port: Number(process.env.ADMIN_PORT || 8001),
            allowedHosts: "all",
            compress: true,
            historyApiFallback: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        },
    };
};

export default config;
