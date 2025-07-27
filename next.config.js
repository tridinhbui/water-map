/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
      env: {
        NEXT_PUBLIC_SITE_NAME: 'SafeDrop',
    },
}

module.exports = nextConfig 