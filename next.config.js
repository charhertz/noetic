const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    mdxRs: true,
		serverComponentsExternalPackages: [
			"shiki",
			"@notionhq/client"
		]
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
