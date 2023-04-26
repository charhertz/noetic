import {
  PageObjectResponse,
  BlockObjectResponse,
  ListBlockChildrenResponse
} from "@notionhq/client/build/src/api-endpoints"
import {
  Client
} from "@notionhq/client"
import config from "@/site.config.mjs"
import { NotionPost } from './type'
import probe from "probe-image-size"

const notionToken = config.notionAccessToken!
const databaseId = config.notionDatabaseId!

const notion = new Client({ auth: notionToken })

async function probeImageSize(
	url: string
): Promise<{ width?: number; height?: number }> {
	try {
		const dim = await probe(url)
		return { width: dim.width, height: dim.height }
	} catch (e) {
		console.error("probeImageSize", e)
		return {
			width: undefined,
			height: undefined,
		}
	}
}

async function getPostInfo(page: PageObjectResponse): Promise<NotionPost> {
  const title = (page as any).properties.Title.title[0].plain_text as string

  const tags = (page as any).properties.Tags.multi_select.map(
    (i: any) => i.name
  ) as string[]

  const coverUrl = (page.cover as any)?.external.url as string
  const { width, height } = await probeImageSize(coverUrl)

  return {
    id: page.id,
    title,
    tags,
    publishedDate: (page.properties["Published Date"] as any).date?.start,
    slug: (page.properties.Slug as any).rich_text[0].plain_text,
    cover: {
      url: coverUrl,
      width,
			height,
    },
    description: (page.properties.Description as any).rich_text[0]?.plain_text,
  }
}

export async function getPostList() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'status',
          select: {
            equals: 'Published'
          }
        },
        {
          property: 'Type',
          select: {
            equals: 'Post'
          }
        }
      ]
    }
  })

  while (response.has_more && response.next_cursor) {
    const { results, has_more, next_cursor } = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'status',
            select: {
              equals: 'Published'
            }
          },
          {
            property: 'Type',
            select: {
              equals: 'Post'
            }
          }
        ]
      },
      start_cursor: response.next_cursor
    });

    response.results = [...response.results, ...results]
    response.has_more = has_more
    response.next_cursor = next_cursor
  }

  return await Promise.all(
    (response.results as PageObjectResponse[])
      .map(getPostInfo)
  )
}


export async function getSinglePostInfo(pageId: string, isSlug = false) {
	if (pageId === "sw.js") return null

	if (isSlug) {
		const postList = await getPostList()
		const post = postList?.find((i) => i.slug === pageId)
		if (post) {
			return post
		}
		return null
	}

  const page = (await notion.pages.retrieve({ page_id: pageId })) as PageObjectResponse

	return await getPostInfo(page)
}

export type Block = {
	cur: BlockObjectResponse
	children?: Block[]
}

export async function getSinglePostContent(
	blockId: string,
	isSlug = false
): Promise<Block[] | null> {
	if (isSlug) {
		const postList = await getPostList()
		const post = postList?.find((i) => i.slug === blockId)
		if (post) {
			return getSinglePostContent(post.id)
		}
		return null
	}

  const blocks: Block[] = []
  let cursor
	
  while (true) {
    const response = (await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor ? cursor : undefined
    })) as ListBlockChildrenResponse
    const results = response.results as BlockObjectResponse[]

    const resultsWithChildren = await Promise.all(
      results.map(async (i) => {
        if (i.has_children) {
          return {
            cur: i,
            children: await getSinglePostContent(i.id),
          }
        }
        return {
          cur: i,
        }
      })
    )
    blocks.push(...(resultsWithChildren as Block[]))
    if (!response.next_cursor) {
      break
    }
    cursor = response.next_cursor
  }
  return blocks
}

export type PostContentType = NonNullable<
	Awaited<ReturnType<typeof getSinglePostContent>>
>

export interface TOCItem {
	title: string
	level: number
	children: TOCItem[]
}

export function getTOCFromBlocks(blocks: Block[]) {
	const toc: TOCItem[] = []

	for (const block of blocks) {
		const type = block.cur.type
		if (type === "heading_1") {
			const title = block.cur.heading_1.rich_text
				.map((t) => t.plain_text)
				.join("")

			toc.push({
				title,
				children: [],
				level: 1,
			})
		} else if (type === "heading_2") {
			const title = block.cur.heading_2.rich_text
				.map((t) => t.plain_text)
				.join("")
			if (toc.length !== 0 && toc.at(-1)?.level === 1) {
				toc.at(-1)?.children.push({
					title,
					children: [],
					level: 2,
				})
			} else {
				toc.push({
					title,
					children: [],
					level: 2,
				})
			}
		} else if (type === "heading_3") {
			const title = block.cur.heading_3.rich_text
				.map((t) => t.plain_text)
				.join("")
			if (
				toc.length !== 0 &&
				toc.at(-1)?.children.length !== 0 &&
				toc.at(-1)?.level === 2
			) {
				toc.at(-1)?.children.at(-1)?.children.push({
					title,
					children: [],
					level: 3,
				})
			} else {
				toc.push({
					title,
					children: [],
					level: 3,
				})
			}
		}
	}

	return toc
}
