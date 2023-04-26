import { getPostList } from "@/lib/notion"
import config from "@/site.config.mjs"
import { Feed } from "feed"
import dayjs from '@/lib/day'

export async function GET() {
  const feed = new Feed({
		title: config.siteName,
		description: config.description,
		id: config.siteUrl,
		link: config.siteUrl,
		image: config.siteUrl + config.avatarPath,
		favicon: config.siteUrl + config.faviconPath,
		copyright: "All rights reserved, " + config.siteName,
		feedLinks: {
			atom: config.siteUrl + "/feed",
		},
		author: {
			name: config.authorName,
			email: config.authorEmail,
			link: config.authorLink,
		},
	})

	const posts = await getPostList()

	posts?.forEach((post) => {
		feed.addItem({
			title: post.title,
			link: config.siteUrl + "/post/" + post.slug,
			date: dayjs(post.publishedDate).toDate(),
			description: post.description,
			category: post.tags.map((tag) => ({
				name: tag,
			})),
		})
	})

	return new Response(feed.rss2(), {
		headers: {
			"Content-Type": "text/xml",
		},
	})
}
