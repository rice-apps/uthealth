'use client'

import { useState } from 'react'
import ExerciseCard, { Exercise } from './ExerciseCard'
import ExerciseConfig from './ExerciseConfig'
import { useRouter } from 'next/navigation'

interface ExerciseGridProps {
	exercises: Exercise[]
	patientId: string
	weekId: string
}

export default function ExerciseGrid({ exercises, patientId, weekId }: ExerciseGridProps) {
	const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])
	const [showConfig, setShowConfig] = useState(false)
	const router = useRouter()

	const handleToggleSelect = (id: string | number, selected: boolean) => {
		if (selected) {
			const exercise = exercises.find((e) => e.exercise_id === id)
			if (exercise) {
				setSelectedExercises((prev) => [...prev, exercise])
			}
		} else {
			setSelectedExercises((prev) => prev.filter((e) => e.exercise_id !== id))
		}
	}

	const handleSave = () => {
		setShowConfig(true)
	}

	const handleConfigComplete = () => {
		router.push(`/patients/${patientId}`)
	}

	if (showConfig) {
		return <ExerciseConfig selectedExercises={selectedExercises} patientId={patientId} weekIds={weekId.split(',')} onComplete={handleConfigComplete} />
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
				{exercises.map((exercise) => (
					<ExerciseCard key={exercise.exercise_id} exercise={exercise} patientId={patientId} weekId={weekId} onToggleSelect={handleToggleSelect} initialSelected={selectedExercises.some((e) => e.exercise_id === exercise.exercise_id)} />
				))}
			</div>

			{/* Fixed save button */}
			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
				<div className="w-full max-w-6xl mx-auto flex justify-between items-center">
					<div className="text-gray-700">{selectedExercises.length} exercises selected</div>
					<button onClick={handleSave} className={`px-6 py-3 rounded-lg font-medium text-white ${selectedExercises.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#327689] hover:bg-[#265E6E]'}`} disabled={selectedExercises.length === 0}>
						Configure Exercises
					</button>
				</div>
			</div>
		</>
	)
}
