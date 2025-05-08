/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'awards.portraitfr.fr'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
    middleware: true,
  },
  api: {
    bodyParser: false, // obligatoire pour utiliser FormData
    sizeLimit: '30mb', // facultatif avec FormData mais utile si tu veux le préciser
  },

}

module.exports = nextConfig
