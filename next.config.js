// const path = require('path');
// const process = require('process');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

import path from 'path';
import process from 'process';
const pathBuilder = (subpath) => path.join(process.cwd(), subpath);

const __dirname = path.resolve();

const forProduction = {
    webpack: (config, { webpack }) => {
        return config
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        unoptimized: true,
    },
    output: 'export',
    assetPrefix: './',
};

const forDevelopment={
    webpack: (config, { webpack }) => {
        config.devServer = {
            hot: true, // Enable HMR
        };
        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        unoptimized: true,
    },
    output: process.env.NODE_ENV === "production" ? 'export' : undefined,
    assetPrefix: process.env.NODE_ENV === "production" ? './' : "",
};


/** @type {import('next').NextConfig} */
const nextConfig ={
    webpack: (config, { webpack }) => {
        return config
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        unoptimized: true,
    },
    output: 'export',
    assetPrefix: './',
    eslint:{
        ignoreDuringBuilds: true,
    }
};



// module.exports = nextConfig;
export default nextConfig;

