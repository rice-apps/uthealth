'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

export interface Exercise {
	exercise_id: string | number
	name: string
	description?: string
	type: string
	tags?: string[]
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
		onToggleSelect?.(exercise.exercise_id, newSelected)
	}

	return (
		<div onClick={handleClick} className={`bg-white rounded-lg shadow-md cursor-pointer transition-all duration-200 ${selected ? 'ring-2 ring-[#327689]' : 'hover:shadow-lg'}`}>
			<div className="p-4">
				<div className="flex justify-between items-start mb-2">
					<h3 className="text-lg font-semibold text-[#327689]">{exercise.name}</h3>
					<div className="flex items-center">
						<div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 ${selected ? 'bg-[#327689] border-[#327689]' : 'border-gray-300'}`}>{selected && <Check className="h-3 w-3 text-white" />}</div>
					</div>
				</div>

				{/* Description */}
				{exercise.description && <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>}

				{/* Exercise Type */}
				<div className="mb-2">
					<span className="text-sm text-gray-500 capitalize">{exercise.type === 'rep-based' ? 'Repetition Based' : 'Time Based'}</span>
				</div>

				{/* Tags */}
				{exercise.tags && exercise.tags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{exercise.tags.map((tag, index) => (
							<span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
								{tag}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
