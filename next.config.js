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
  serverExternalPackages: ['@radix-ui/react-dismissable-layer']
}

module.exports = nextConfig