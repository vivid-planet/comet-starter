import HtmlWebpackPlugin from "html-webpack-plugin";
import path, { resolve } from "path";
import * as webpack from "webpack";
import { WebpackConfiguration } from "webpack-dev-server";

const config = (env: unknown, argv: { mode: WebpackConfiguration["mode"] }): webpack.Configuration => {
    const production = argv.mode === "production";
    const publicPath = "/";

    const plugins: WebpackConfiguration["plugins"] = [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        // eslint-disable-next-line import/namespace
        new webpack.DefinePlugin({
            "process.env.API_URL": JSON.stringify(process.env.API_URL),
            "process.env.INTL_URL": JSON.stringify(process.env.INTL_URL),
            "process.env.BUILD_ENV": JSON.stringify(process.env.BUILD_ENV),
        }),
    ];

    return {
        mode: production ? "production" : "development",
        devServer: {
            port: 9000,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    resolve: {
                        fullySpecified: false,
                    },
                    test: /\.m?js/,
                    type: "javascript/auto",
                },
                {
                    test: /\.(css|s[ac]ss)$/i,
                    use: [
                        {
                            loader: "style-loader",
                            options: {
                                injectType: "lazyStyleTag",
                                insert: function insertIntoTarget(element: HTMLElement, options: { target: HTMLElement }) {
                                    (options.target || document.head).appendChild(element);
                                },
                            },
                        },
                        "css-loader",
                        "postcss-loader",
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|otf)$/i,
                    type: "asset",
                },
                {
                    exclude: /node_modules/,
                    test: /\.(ts|tsx|js|jsx)$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [["@babel/preset-react", { runtime: "automatic" }]],
                        },
                    },
                },
            ],
        },
        entry: {
            "comet-webcomponent": ["./src/pre-loader.ts", "./src/loader.ts"],
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name].js",
            chunkFilename: "[id].chunk.js?v=[chunkhash]",
            publicPath,
        },
        resolve: {
            alias: {
                "@src": resolve("src"),
            },
            extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
        },
        plugins,
    };
};

export default config;
