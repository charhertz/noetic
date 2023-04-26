const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    mdxRs: true
  },
  images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
}

module.exports = withMDX(nextConfig)
