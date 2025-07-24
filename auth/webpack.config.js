const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    experiments: {
        topLevelAwait: true,
    },
    devServer: {
        static: path.join(__dirname, "dist"),
        port: 4002,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
                "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
        },
    },
    output: {
        publicPath: "http://localhost:4002/",
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "authApp",
            filename: "remoteEntry.js",
            exposes: {
                "./LoginPage": "./src/components/Login.tsx",
                "./RegistrationPage": "./src/components/Registration.tsx",
            },
            shared: {
                react: { singleton: true, eager: true, requiredVersion: false },
                "react-dom": {
                    singleton: true,
                    eager: true,
                    requiredVersion: false,
                },
            },
        }),

        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),

        new webpack.DefinePlugin({
            "process.env.FIREBASE_API_KEY": JSON.stringify(
                process.env.FIREBASE_API_KEY
            ),
            "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
                process.env.FIREBASE_AUTH_DOMAIN
            ),
            "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
                process.env.FIREBASE_PROJECT_ID
            ),
            "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
                process.env.FIREBASE_STORAGE_BUCKET
            ),
            "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
                process.env.FIREBASE_MESSAGING_SENDER_ID
            ),
            "process.env.FIREBASE_APP_ID": JSON.stringify(
                process.env.FIREBASE_APP_ID
            ),
            "process.env.FIREBASE_MEASUREMENT_ID": JSON.stringify(
                process.env.FIREBASE_MEASUREMENT_ID
            ),
        }),
    ],
};
