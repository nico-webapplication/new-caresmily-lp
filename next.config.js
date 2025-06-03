/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['aos', 'gsap'],
  experimental: {
    serverComponentsExternalPackages: ['styled-components']
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig