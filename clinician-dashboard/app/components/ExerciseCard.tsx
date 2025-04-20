'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Check } from 'lucide-react'

export type Exercise = {
	exercise_id: string | number
	name: string
	tags: string[]
	image_url?: string
	description?: string
	type: string
}

interface ExerciseCardProps {
	exercise: Exercise
	patientId: string
	weekId: string
	onToggleSelect?: (id: string | number, selected: boolean) => void
	initialSelected?: boolean
}

export default function ExerciseCard({ exercise, onToggleSelect, initialSelected = false }: ExerciseCardProps) {
	const [selected, setSelected] = useState(initialSelected)

	const handleClick = () => {
		const newSelected = !selected
		setSelected(newSelected)
		if (onToggleSelect) {
			onToggleSelect(exercise.exercise_id, newSelected)
		}
	}

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={handleClick}>
			{/* Image placeholder */}
			<div className="relative h-48 bg-gray-200">
				{exercise.image_url ? (
					<Image src={exercise.image_url} alt={exercise.name} fill className="object-cover" />
				) : (
					<div className="flex items-center justify-center h-full">
						<svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
					</div>
				)}

				{/* Selection indicator */}
				{selected && (
					<div className="absolute top-2 right-2 bg-[#327689] rounded-full p-1">
						<Check className="h-4 w-4 text-white" />
					</div>
				)}
			</div>

			{/* Content */}
			<div className="p-4">
				<div className="flex justify-between items-start mb-2">
					<h3 className="text-lg font-semibold text-[#327689]">{exercise.name}</h3>
					<div className="flex items-center">
						<div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 ${selected ? 'bg-[#327689] border-[#327689]' : 'border-gray-300'}`}>{selected && <Check className="h-3 w-3 text-white" />}</div>
					</div>
				</div>

				{/* Description */}
				{exercise.description && <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>}

				{/* Tags */}
				<div className="flex flex-wrap gap-2">
					{exercise.tags.map((tag, index) => (
						<span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
							{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}
