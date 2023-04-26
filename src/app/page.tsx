import Image from 'next/image'
import { Inter } from 'next/font/google'
import {
  getPostList
} from "@/lib/notion"
import BlogPost from '@/components/BlogPost';

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const posts = await getPostList()
  if (!posts) return null

  return (
    <main className="flex min-h-screen flex-col items-center justify-between mx-auto flex-grow w-full transition-all max-w-3xl px-4">
      <div>
        {posts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}
