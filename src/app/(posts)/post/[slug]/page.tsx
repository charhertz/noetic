import PostContent from "@/components/PostContent";
import TOC from "@/components/Toc";
import { getSinglePostContent, getSinglePostInfo, getTOCFromBlocks } from "@/lib/notion";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
	const fetchPage = getSinglePostInfo(params.slug, true)
	const fetchBlocks = getSinglePostContent(params.slug, true)

	const [page, blocks] = await Promise.all([fetchPage, fetchBlocks])
	if (!page || !blocks) notFound()

	const toc = getTOCFromBlocks(blocks)

	return (
		<>
			<Image
				className="h-auto w-full rounded-lg"
				src={page.cover.url}
				alt="post cover"
				width={page.cover.width}
				height={page.cover.height}
			/>
			<h1 className="my-6 self-start text-4xl">{page.title}</h1>
			<PostContent blocks={blocks} removeAnchor={false} />
			<TOC toc={toc} className="hidden xl:block" />
		</>
	)
}
