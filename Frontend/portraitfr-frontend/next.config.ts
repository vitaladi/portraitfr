/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'testsite.portraitfr.fr'],
  },  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
}

module.exports = nextConfig
