'use client'

import { useRouter } from 'next/navigation'

interface BackButtonProps {
	className?: string
}

export default function BackButton({ className = '' }: BackButtonProps) {
	const router = useRouter()

	return (
		<button onClick={() => router.back()} className={`cursor-pointer flex items-center text-gray-500 hover:text-gray-700 ${className}`}>
			<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
			</svg>
			Back
		</button>
	)
}
