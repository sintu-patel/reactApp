module.exports = {
    development: {
        isDev: true,
        port: process.env.PORT || 3002
    },
    production: {
        isDev: false,
        port: process.env.PORT || 3003
    }
};

