import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
	return (
		<nav className="w-full py-4 px-6 border-b border-gray-200">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="flex items-center">
					<Image src="/ut-health-logo.png" alt="UTHealth Logo" width={50} height={50} priority />
					<span className="ml-3 text-xl font-semibold text-black">UTHealth Neurology</span>
				</div>
				<div className="flex items-center">
					<Link href="/" className="mr-6 text-[#327689] hover:text-[#265e6d] font-medium">
						Dashboard
					</Link>
				</div>
			</div>
		</nav>
	)
}
