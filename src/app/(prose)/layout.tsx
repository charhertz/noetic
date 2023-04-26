export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="my-8 flex w-full flex-col gap-3 prose">{children}</div>
		</>
	)
}
