"use client"

import { useState } from 'react'
import Link from 'next/link'
import config from '@/site.config.mjs'
import { useSearchParams, usePathname } from 'next/navigation'
import {
	HomeIcon,
	MenuIcon,
	RssIcon,
} from 'lucide-react'
import ToggleTheme from './ToggleTheme'
import { motion } from 'framer-motion'
import Avatar from '@/components/Avatar'

const NavBar = () => {
	const [showMenu, setShowMenu] = useState(false)

	const searchParams = useSearchParams()
	const pathname = usePathname()

	let activeMenu = ''
	if (searchParams.get('slug')) {
		activeMenu = '/' + searchParams.get('slug')
	} else {
		activeMenu = pathname
	}

	const links: any[] = [
		{
			id: 0,
			name: 'Home',
			to: '/',
			icon: <HomeIcon className='inline-block mb-1 h-5 w-5' />,
			show: true
		},
		{
			id: 1,
			name: 'About',
			to: '/about',
			icon: <MenuIcon className='inline-block mb-1 h-5 w-5' />,
			show: true
		},
		{
			id: 2,
			name: 'RSS',
			to: '/rss.xml',
			icon: <RssIcon className='inline-block mb-1 h-5 w-5' />,
			show: true
		},
	]
	return (
		<motion.div className='flex'>
			{/* Desktop Menu */}
			<ul className='hidden md:flex md:gap-1'>
				{links.map(
					(link) =>
						link.show && (
							<Link passHref href={link.to} key={link.id} scroll={false}>
								<li
									className={`${activeMenu === link.to ? 'bg-gray-200 dark:bg-gray-700' : ''
										} hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg block py-1 px-2 nav`}
								>
									<div className='font-light'>
										{link.icon}
										<span className='inline-block m-1'>{link.name}</span>
									</div>
								</li>
							</Link>

						)
				)}
			</ul>

			<div className='nav-func-btn block'>
				<ToggleTheme />
			</div>

			{/* Mobile Phone Menu */}
			<div className='md:hidden mr-2 block '>
				<button
					type='button' aria-label='Menu'
					onClick={() => setShowMenu((showMenu) => !showMenu)}
					className='hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg block p-2 -mr-3 md:pb-3'
				>
					<MenuIcon className='inline-block mb-1 h-5 w-5' />
				</button>
				{showMenu && (
					<div className='absolute right-0 w-40 mr-4 mt-2 bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600 rounded-md shadow-lg outline-none'>
						<div className='py-1'>
							{links.map(
								(link) =>
									link.show && (
										<Link passHref key={link.id} href={link.to} scroll={false}>
											<button
												onClick={() => setShowMenu((showMenu) => !showMenu)}
												className='text-left hover:bg-gray-100 dark:hover:bg-gray-600 font-light block justify-between w-full px-4 py-2 leading-5'
											>
												{link.icon}
												<span className='m-1'>{link.name}</span>
											</button>
										</Link>
									)
							)}
						</div>
					</div>
				)}
			</div>
		</motion.div>
	)
}

const Header = ({ navBarTitle, fullWidth }: any) => {

	return (
		<>
			<div
				className={`m-auto w-full flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${!fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
					}`}
			>
				<div className='flex items-center'>
					<div>
						<Avatar className='hover:text-blue-500 dark:hover:text-blue-500 fill-current' />
					</div>
					{navBarTitle ? (
						<p
							className='ml-2 font-medium hidden xl:block'
						>
							{navBarTitle}
						</p>
					) : (
						<p
							className='ml-2 font-medium hidden'
						>
							{config.siteName},{' '}
							<span className='font-normal'>{config.description}</span>
						</p>
					)}
				</div>
				<NavBar />
			</div>
		</>
	)
}

export default Header
