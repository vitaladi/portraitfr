/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'awards.portraitfr.fr'],
  },  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
}

module.exports = nextConfig
