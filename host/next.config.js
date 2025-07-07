const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
    images: {
        domains: ['s.alicdn.com']
    },
    webpack(config) {
        config.plugins.push(
            new NextFederationPlugin({
                name: 'hostApp',
                filename: 'static/chunks/remoteEntry.js',
                remotes: {
                    productApp:
                        'productApp@http://localhost:4001/_next/static/chunks/remoteEntry.js'
                },
                shared: {
                    react: { singleton: true, eager: true, requiredVersion: false },
                    'react-dom': { singleton: true, eager: true, requiredVersion: false }
                }
            })
        );
        return config;
    }
};
