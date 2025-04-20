import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

interface ExerciseConfigProps {
	selectedExercises: {
		exercise_id: string | number
		name: string
		type: string
	}[]
	patientId: string
	weekIds: string[]
	onComplete: () => void
}

export default function ExerciseConfig({ selectedExercises, patientId, weekIds, onComplete }: ExerciseConfigProps) {
	const [exerciseConfigs, setExerciseConfigs] = useState<
		Record<
			string | number,
			{
				days: number[]
				sets?: number
				reps?: number
				time?: number
			}
		>
	>({})

	const dayOptions = [
		{ value: 0, label: 'Sun' },
		{ value: 1, label: 'Mon' },
		{ value: 2, label: 'Tue' },
		{ value: 3, label: 'Wed' },
		{ value: 4, label: 'Thu' },
		{ value: 5, label: 'Fri' },
		{ value: 6, label: 'Sat' },
	]

	const handleDayToggle = (exerciseId: string | number, day: number) => {
		setExerciseConfigs((prev) => {
			const currentConfig = prev[exerciseId] || { days: [] }
			const newDays = currentConfig.days.includes(day) ? currentConfig.days.filter((d) => d !== day) : [...currentConfig.days, day].sort()

			return {
				...prev,
				[exerciseId]: {
					...currentConfig,
					days: newDays,
				},
			}
		})
	}

	const handleValueChange = (exerciseId: string | number, field: 'sets' | 'reps' | 'time', value: string) => {
		const numValue = parseInt(value) || 0
		setExerciseConfigs((prev) => ({
			...prev,
			[exerciseId]: {
				...prev[exerciseId],
				[field]: numValue,
			},
		}))
	}

	const getWeekDates = (weekId: string) => {
		const [year, weekNum] = weekId.split('-W')
		const firstDayOfYear = new Date(parseInt(year), 0, 1)
		const weekNumber = parseInt(weekNum)

		// Find first Monday of the year
		while (firstDayOfYear.getDay() !== 1) {
			firstDayOfYear.setDate(firstDayOfYear.getDate() + 1)
		}

		// Add weeks
		const weekStart = new Date(firstDayOfYear)
		weekStart.setDate(firstDayOfYear.getDate() + (weekNumber - 1) * 7)

		const weekEnd = new Date(weekStart)
		weekEnd.setDate(weekStart.getDate() + 6)

		return { start: weekStart.toISOString().split('T')[0], end: weekEnd.toISOString().split('T')[0] }
	}

	const handleSave = async () => {
		const supabase = createClient()

		const prescriptions = []

		for (const weekId of weekIds) {
			const { start, end } = getWeekDates(weekId)

			for (const exercise of selectedExercises) {
				const config = exerciseConfigs[exercise.exercise_id]
				if (!config || !config.days.length) continue

				prescriptions.push({
					exercise_id: exercise.exercise_id,
					patientID: patientId,
					start_date: start,
					end_date: end,
					days: config.days,
					sets: config.sets || null,
					reps: config.reps || null,
					time: config.time || null,
				})
			}
		}

		const { error } = await supabase.from('prescription').insert(prescriptions)

		if (error) {
			console.error('Error saving prescriptions:', error)
			return
		}

		onComplete()
	}

	return (
		<div className="space-y-8">
			{selectedExercises.map((exercise) => (
				<div key={exercise.exercise_id} className="bg-white rounded-lg shadow-md p-6">
					<h3 className="text-xl font-semibold text-[#327689] mb-4">{exercise.name}</h3>

					<div className="mb-6">
						<p className="text-sm font-medium text-gray-700 mb-2">Select Days:</p>
						<div className="flex flex-wrap gap-2">
							{dayOptions.map((day) => (
								<button key={day.value} onClick={() => handleDayToggle(exercise.exercise_id, day.value)} className={`px-3 py-1 rounded-full text-sm font-medium ${exerciseConfigs[exercise.exercise_id]?.days.includes(day.value) ? 'bg-[#327689] text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
									{day.label}
								</button>
							))}
						</div>
					</div>

					{exercise.type === 'rep-based' ? (
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label htmlFor={`sets-${exercise.exercise_id}`} className="block text-sm font-medium text-gray-700 mb-1">
									Sets
								</label>
								<input type="number" id={`sets-${exercise.exercise_id}`} min="0" value={exerciseConfigs[exercise.exercise_id]?.sets || ''} onChange={(e) => handleValueChange(exercise.exercise_id, 'sets', e.target.value)} className="border border-gray-300 rounded-md w-full p-2 text-black focus:ring-[#327689] focus:border-[#327689]" />
							</div>
							<div>
								<label htmlFor={`reps-${exercise.exercise_id}`} className="block text-sm font-medium text-gray-700 mb-1">
									Reps
								</label>
								<input type="number" id={`reps-${exercise.exercise_id}`} min="0" value={exerciseConfigs[exercise.exercise_id]?.reps || ''} onChange={(e) => handleValueChange(exercise.exercise_id, 'reps', e.target.value)} className="border border-gray-300 rounded-md w-full p-2 text-black focus:ring-[#327689] focus:border-[#327689]" />
							</div>
						</div>
					) : (
						<div>
							<label htmlFor={`time-${exercise.exercise_id}`} className="block text-sm font-medium text-gray-700 mb-1">
								Time (minutes)
							</label>
							<input type="number" id={`time-${exercise.exercise_id}`} min="0" value={exerciseConfigs[exercise.exercise_id]?.time || ''} onChange={(e) => handleValueChange(exercise.exercise_id, 'time', e.target.value)} className="border border-gray-300 rounded-md w-full p-2 text-black focus:ring-[#327689] focus:border-[#327689]" />
						</div>
					)}
				</div>
			))}

			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
				<div className="w-full max-w-6xl mx-auto flex justify-end">
					<button onClick={handleSave} className="px-6 py-3 rounded-lg font-medium text-white bg-[#327689] hover:bg-[#265E6E]">
						Save Prescriptions
					</button>
				</div>
			</div>
		</div>
	)
}
