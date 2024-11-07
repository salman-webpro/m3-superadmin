/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.27.124',
            },
            {
                protocol: 'http',
                hostname: '115.127.97.250',
            },
            {
                protocol: 'https',
                hostname: 'marketplace.canva.com',
            },
            {
                protocol: 'https',
                hostname: '18.142.155.168',
            },
            {
                protocol: 'https',
                hostname: 'makemymenu.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
            {
                protocol: 'https',
                hostname: 'cdn.ttgtmedia.com',
            },
        ],
    },
    experimental: {
        serverActions: {
            allowedOrigins: [
                'http://115.127.97.250:8010/',
                'http://115.127.97.250:8080/',
            ]
        }
    }
};
export default nextConfig;
