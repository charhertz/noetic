"use client"

import { cn } from "@/lib/utils"
import config from "@/site.config.mjs"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Avatar({ className = "" }: { className?: string }) {
	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
		>
			<Link href="/">
				<Image
					className={cn(
						"rounded-full ring-2 ring-gray-300 dark:ring-gray-700 p-1",
						className
					)}
					src={config.avatarPath}
					alt={config.authorName}
					priority={true}
					width={64}
					height={64}
				/>
			</Link>
		</motion.button>
	)
}
