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
                        'productApp@https://product-ali.vercel.app/_next/static/chunks/remoteEntry.js',
                    authApp: 'authApp@https://micro-alibaba.onrender.com/remoteEntry.js'
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
