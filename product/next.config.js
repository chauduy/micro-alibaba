const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
    images: {
        domains: ["s.alicdn.com"],
    },
    webpack(config) {
        config.plugins.push(
            new NextFederationPlugin({
                name: "productApp",
                filename: "static/chunks/remoteEntry.js",
                exposes: {
                    "./HomePage": "./src/components/export/HomePage.tsx",
                    "./CategoryPage":
                        "./src/components/export/CategoryPage.tsx",
                    "./ProductPage": "./src/components/export/ProductPage.tsx",
                },
                shared: {
                    react: { singleton: true },
                    "react-dom": { singleton: true },
                    tailwindcss: {
                        eager: true,
                        singleton: true,
                        requiredVersion: false,
                    },
                },
            })
        );
        return config;
    },
};
