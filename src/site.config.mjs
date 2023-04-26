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
			url: "https://github.com/charhertz",
		},
		{
			type: "Twitter",
			url: "https://twitter.com/charhertz",
		},
		{
			type: "Email",
			url: "mailto:hi@charhertz.com",
		},
	],
	codeTheme: {
		light: "github-light",
		dark: "github-dark",
	},
	siteUrl: "https://noetic.vercel.app",
	authorName: "Charlie",
	authorLink: "https://charhertz.com",
	authorEmail: "hi@charhertz.com",
	timeZone: "Asia/Shanghai",
	since: 2023, // If leave this empty, current year will be used.
  postsPerPage: 10,
	autoCollapsedNavBar: false,
	notionDatabaseId: process.env.NOTION_DATABASE_ID, // DO NOT CHANGE THIS! Edit .env file!
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
}

export default siteConfig
