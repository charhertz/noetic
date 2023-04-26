export interface NotionPost {
	id: string
	title: string
	slug: string
	tags: string[]
	publishedDate: string
	cover: {
		url: string
		width?: number
		height?: number
	}
	description: string
}
