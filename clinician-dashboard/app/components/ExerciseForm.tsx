'use client'

import DaySelector from './DaySelector'

interface BaseExercise {
	name: string
	selected: boolean
}

interface RepBasedExercise extends BaseExercise {
	sets: number
	reps: number
	time?: never
	timesPerWeek?: never
}

interface TimeBasedExercise extends BaseExercise {
	time: number
	timesPerWeek: number
	sets?: never
	reps?: never
}

type Exercise = RepBasedExercise | TimeBasedExercise

interface ExerciseFormProps {
	exerciseType: 'rep-based' | 'time-based'
	selectedExercise: Exercise
	initialDays: string[]
	dayCodeToName: Record<string, string>
}

export default function ExerciseForm({ exerciseType, selectedExercise, initialDays, dayCodeToName }: ExerciseFormProps) {
	// Form state would be managed here if needed

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Handle form submission - would typically send data to an API
		console.log('Form submitted')
	}

	return (
		<form onSubmit={handleSubmit}>
			{/* Rep-based exercise form */}
			{exerciseType === 'rep-based' && 'sets' in selectedExercise && (
				<div>
					<h2 className="text-xl font-semibold text-[#327689] mb-4">{selectedExercise.name}</h2>

					<div className="mb-4">
						<label htmlFor="sets" className="block text-sm font-medium text-gray-700 mb-1">
							Sets
						</label>
						<input type="number" id="sets" defaultValue={selectedExercise.sets} className="border border-gray-300 rounded-md w-full p-2 text-black focus:ring-[#327689] focus:border-[#327689]" />
					</div>

					<div className="mb-6">
						<label htmlFor="reps" className="block text-sm font-medium text-gray-700 mb-1">
							Repetitions
						</label>
						<input type="number" id="reps" defaultValue={selectedExercise.reps} className="border border-gray-300 rounded-md w-full p-2 text-black focus:ring-[#327689] focus:border-[#327689]" />
					</div>

					<div className="mb-6">
						<p className="block text-sm font-medium text-gray-700 mb-2">What days? (Select all)</p>
						<DaySelector initialSelectedDays={initialDays} dayCodeToName={dayCodeToName} />
					</div>
				</div>
			)}

			{/* Time-based exercise form */}
			{exerciseType === 'time-based' && 'time' in selectedExercise && (
				<div>
					<h2 className="text-xl font-semibold text-[#327689] mb-4">{selectedExercise.name}</h2>

					<div className="mb-4">
						<label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
							Time (in minutes)
						</label>
						<input type="number" id="time" defaultValue={selectedExercise.time} className="border text-black border-gray-300 rounded-md w-full p-2 focus:ring-[#327689] focus:border-[#327689]" />
					</div>

					<div className="mb-6">
						<label htmlFor="timesPerWeek" className="block text-sm font-medium text-gray-700 mb-1">
							How many times a week?
						</label>
						<input type="number" id="timesPerWeek" defaultValue={selectedExercise.timesPerWeek} className="border text-black border-gray-300 rounded-md w-full p-2 focus:ring-[#327689] focus:border-[#327689]" />
					</div>
				</div>
			)}

			<div className="border-t pt-4 flex justify-end">
				<button type="submit" className="bg-[#327689] text-white px-4 py-2 rounded-md hover:bg-[#265e6d] transition-colors">
					Save
				</button>
			</div>
		</form>
	)
}
