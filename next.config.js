/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        config.resolve.modules.push(__dirname);
        return config;
    },
};

module.exports = nextConfig;
