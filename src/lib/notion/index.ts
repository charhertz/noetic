import {
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import {
  Client
} from "@notionhq/client"
import config from "@/site.config.mjs"
import { NotionPost } from './type'

const notionToken = config.notionAccessToken!
const databaseId = config.notionDatabaseId!

const notion = new Client({ auth: notionToken })

async function getPostInfo(page: PageObjectResponse): Promise<NotionPost> {
  const title = (page as any).properties.Title.title[0].plain_text as string

  const tags = (page as any).properties.Tags.multi_select.map(
    (i: any) => i.name
  ) as string[]

  const coverUrl = (page.cover as any)?.external.url as string

  return {
    id: page.id,
    title,
    tags,
    publishedDate: (page.properties["Published Date"] as any).date?.start,
    slug: (page.properties.Slug as any).rich_text[0].plain_text,
    cover: {
      url: coverUrl,
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
