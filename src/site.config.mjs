const siteConfig = {
	siteName: "Charlie's Blog",
	siteLanguage: "zh-Hans",
	description: "Charlie's blog, about programming",
	shortDescription: "undefined",
	avatarPath: "/avatar.jpg",
	faviconPath: "/favicon.svg",
	links: [
		{
			type: "GitHub",
			url: "https://github.com/devscharlie",
		},
		{
			type: "Twitter",
			url: "https://twitter.com/DevsCharlie",
		},
		{
			type: "Email",
			url: "mailto:hi@devscharlie.com",
		},
	],
	codeTheme: {
		light: "github-light",
		dark: "github-dark",
	},
	siteUrl: "https://noetic.vercel.app",
	authorName: "Charlie",
	authorLink: "https://devscharlie.com",
	authorEmail: "hi@devscharlie.com",
	timeZone: "Asia/Shanghai",
	since: 2023, // If leave this empty, current year will be used.
  postsPerPage: 10,
	notionDatabaseId: process.env.NOTION_DATABASE_ID, // DO NOT CHANGE THIS! Edit .env file!
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
}

export default siteConfig
