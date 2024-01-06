/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ["storage.googleapis.com"], // Add your S3 bucket URL here
        // domains: ["concertify.s3.eu-central-1.amazonaws.com"],
    },
};
