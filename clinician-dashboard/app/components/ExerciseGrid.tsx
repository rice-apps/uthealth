'use client'

import { useState } from 'react'
import ExerciseCard, { Exercise } from './ExerciseCard'

interface ExerciseGridProps {
	exercises: Exercise[]
	patientId: string
	weekId: string
	onSave?: (selectedExercises: (string | number)[]) => void
}

export default function ExerciseGrid({ exercises, patientId, weekId, onSave }: ExerciseGridProps) {
	const [selectedExercises, setSelectedExercises] = useState<(string | number)[]>([])

	const handleToggleSelect = (id: string | number, selected: boolean) => {
		if (selected) {
			setSelectedExercises((prev) => [...prev, id])
		} else {
			setSelectedExercises((prev) => prev.filter((exerciseId) => exerciseId !== id))
		}
	}

	const handleSave = () => {
		if (onSave) {
			onSave(selectedExercises)
		} else {
			// Default save behavior if no callback provided
			console.log('Saved exercises:', selectedExercises)
			alert(`Selected ${selectedExercises.length} exercises`)
		}
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
				{exercises.map((exercise) => (
					<ExerciseCard key={exercise.id} exercise={exercise} patientId={patientId} weekId={weekId} onToggleSelect={handleToggleSelect} initialSelected={selectedExercises.includes(exercise.id)} />
				))}
			</div>

			{/* Fixed save button */}
			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
				<div className="w-full max-w-6xl mx-auto flex justify-between items-center">
					<div className="text-gray-700">{selectedExercises.length} exercises selected</div>
					<button onClick={handleSave} className={`px-6 py-3 rounded-lg font-medium text-white ${selectedExercises.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#327689] hover:bg-[#265E6E]'}`} disabled={selectedExercises.length === 0}>
						Save Exercises
					</button>
				</div>
			</div>
		</>
	)
}
