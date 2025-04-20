import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

interface ExerciseConfigProps {
	selectedExercises: {
		exercise_id: string | number
		name: string
		type: string
	}[]
	patientId: string
	weekId: string
	onComplete: () => void
}

export default function ExerciseConfig({ selectedExercises, patientId, weekId, onComplete }: ExerciseConfigProps) {
	console.log('Received weekId:', weekId) // Debug log

	// Ensure weekId is not undefined, decode it, and split it into an array
	const decodedWeekId = decodeURIComponent(weekId || '')
	const weekIds = decodedWeekId ? decodedWeekId.split(',') : []
	console.log('Processed weekIds:', weekIds) // Debug log

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
			// Get existing config or create new one
			const currentConfig = prev[exerciseId] || {}
			const currentDays = currentConfig.days || []

			const newDays = currentDays.includes(day) ? currentDays.filter((d) => d !== day) : [...currentDays, day].sort()

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

	const getWeekDates = (weekIds: string[]) => {
		console.log('Processing weeks:', weekIds) // Debug log

		if (weekIds.length === 0) {
			console.error('No weeks selected')
			return { start: '', end: '' }
		}

		// Log each week ID being processed
		weekIds.forEach((weekId, index) => {
			console.log(`Week ${index + 1}: ${weekId}`)
		})

		// Create an array to store all the date ranges
		const dateRanges: { start: Date; end: Date }[] = []

		// Process each week ID
		for (const weekId of weekIds) {
			try {
				// Parse the ISO week format (e.g., "2025-W12")
				const [yearStr, weekStr] = weekId.split('-W')
				if (!yearStr || !weekStr) {
					console.error(`Invalid week format: ${weekId}`)
					continue
				}

				const year = parseInt(yearStr)
				const week = parseInt(weekStr)

				if (isNaN(year) || isNaN(week)) {
					console.error(`Invalid year or week number: ${weekId}`)
					continue
				}

				console.log(`Processing week ${weekId}: year=${year}, week=${week}`)

				// Create a date for January 1st of the year
				const firstDayOfYear = new Date(year, 0, 1)

				// Calculate the first Monday of the year
				const firstMonday = new Date(firstDayOfYear)
				const daysToAdd = firstDayOfYear.getDay() === 0 ? 1 : 8 - firstDayOfYear.getDay()
				firstMonday.setDate(firstDayOfYear.getDate() + daysToAdd)

				console.log(`First Monday of ${year}: ${firstMonday.toISOString().split('T')[0]}`)

				// Calculate the start of our target week
				const weekStart = new Date(firstMonday)
				weekStart.setDate(firstMonday.getDate() + (week - 1) * 7)

				// Calculate the end of the week (6 days later)
				const weekEnd = new Date(weekStart)
				weekEnd.setDate(weekStart.getDate() + 6)

				console.log(`Week ${weekId}:`, {
					start: weekStart.toISOString().split('T')[0],
					end: weekEnd.toISOString().split('T')[0],
				})

				dateRanges.push({ start: weekStart, end: weekEnd })
			} catch (error) {
				console.error(`Error processing week ${weekId}:`, error)
			}
		}

		if (dateRanges.length === 0) {
			console.error('No valid date ranges calculated')
			return { start: '', end: '' }
		}

		// Log all calculated dates
		console.log('All calculated dates:', dateRanges)

		// Find earliest start date and latest end date
		const startDate = new Date(Math.min(...dateRanges.map((d) => d.start.getTime())))
		const endDate = new Date(Math.max(...dateRanges.map((d) => d.end.getTime())))

		const result = {
			start: startDate.toISOString().split('T')[0],
			end: endDate.toISOString().split('T')[0],
		}

		console.log('Final date range:', result) // Debug log
		return result
	}

	const handleSave = async () => {
		try {
			if (weekIds.length === 0) {
				console.error('No weeks selected')
				return
			}

			console.log('Starting save process with weekIds:', weekIds)
			console.log('Selected exercises:', selectedExercises)
			console.log('Exercise configs:', exerciseConfigs)

			const supabase = createClient()

			const prescriptions = []

			// Calculate start and end dates once for all selected weeks
			const { start, end } = getWeekDates(weekIds)
			console.log('Date range for prescriptions:', { start, end }) // Debug log

			if (!start || !end) {
				console.error('Invalid date range')
				return
			}

			// Create a prescription for each exercise with valid configuration
			for (const exercise of selectedExercises) {
				const config = exerciseConfigs[exercise.exercise_id]
				if (!config || !config.days.length) {
					console.log(`Skipping exercise ${exercise.exercise_id} - no config or no days selected`)
					continue
				}

				// Log the prescription being created
				const prescription = {
					exercise_id: exercise.exercise_id,
					patientID: parseInt(patientId),
					start_date: start,
					end_date: end,
					days: config.days,
					sets: config.sets || null,
					reps: config.reps || null,
					time: config.time || null,
				}

				console.log(`Creating prescription for exercise ${exercise.exercise_id}:`, prescription)
				prescriptions.push(prescription)
			}

			if (prescriptions.length === 0) {
				console.error('No valid prescriptions to save')
				return
			}

			console.log('Saving prescriptions:', JSON.stringify(prescriptions, null, 2))

			// Use upsert to handle existing records
			const { data, error } = await supabase
				.from('prescription')
				.upsert(prescriptions, {
					onConflict: 'patientID,exercise_id,start_date,end_date',
					ignoreDuplicates: false,
				})
				.select()

			if (error) {
				console.error('Error saving prescriptions:', JSON.stringify(error, null, 2))
				return
			}

			console.log('Saved prescriptions:', JSON.stringify(data, null, 2))
			onComplete()
		} catch (err) {
			console.error('Unexpected error during save:', err)
		}
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
								<button key={day.value} onClick={() => handleDayToggle(exercise.exercise_id, day.value)} className={`px-3 py-1 rounded-full text-sm font-medium ${exerciseConfigs[exercise.exercise_id]?.days?.includes(day.value) ? 'bg-[#327689] text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
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
