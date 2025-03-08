// Day's exercise's details page
import Navbar from '@/app/components/Navbar'
import BackButton from '@/app/components/BackButton'
import { X } from 'lucide-react'
import ExerciseForm from '@/app/components/ExerciseForm'

type Params = {
	params: {
		patient_id: string
		week_id: string
		exercise_id: string
		day_id: string
	}
}

// Define types for our exercises
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

interface ExerciseDetails {
	title: string
	type: 'rep-based' | 'time-based'
	description: string
	exercises: Exercise[]
	days: string[]
}

// Mock data for exercise details - in a real app, this would come from an API or database
const getExerciseDetails = (exerciseId: string): ExerciseDetails => {
	// Different exercise types based on the exercise ID
	const exercises: Record<string, ExerciseDetails> = {
		'1': {
			title: 'Weight Lifting',
			type: 'rep-based',
			description: 'Perform strength training exercises',
			exercises: [
				{ name: 'Squats', sets: 3, reps: 10, selected: true },
				{ name: 'Lorem', sets: 0, reps: 0, selected: false },
				{ name: 'Lorem', sets: 0, reps: 0, selected: false },
				{ name: 'Lorem', sets: 0, reps: 0, selected: false },
				{ name: 'Lorem', sets: 0, reps: 0, selected: false },
			],
			days: [], // Start with empty days for default white buttons
		},
		'2': {
			title: 'Aerobics',
			type: 'time-based',
			description: 'Perform cardiovascular exercises',
			exercises: [
				{ name: 'Run', time: 30, timesPerWeek: 3, selected: true },
				{ name: 'Lorem', time: 0, timesPerWeek: 0, selected: false },
				{ name: 'Lorem', time: 0, timesPerWeek: 0, selected: false },
				{ name: 'Lorem', time: 0, timesPerWeek: 0, selected: false },
				{ name: 'Lorem', time: 0, timesPerWeek: 0, selected: false },
			],
			days: [], // Start with empty days for default white buttons
		},
	}

	return (
		exercises[exerciseId] || {
			title: 'Unknown Exercise',
			type: 'rep-based',
			description: '',
			exercises: [],
			days: [],
		}
	)
}

// Map short day codes to full day names
const dayCodeToName: Record<string, string> = {
	M: 'Monday',
	Tu: 'Tuesday',
	W: 'Wednesday',
	Th: 'Thursday',
	F: 'Friday',
	Sa: 'Saturday',
	Su: 'Sunday',
}

export default async function DayExercisePage({ params }: Params) {
	const { week_id, exercise_id, day_id } = await params
	const exerciseDetails = getExerciseDetails(exercise_id)

	// Get the first selected exercise (in a real app, you would get the selected one for this day)
	const selectedExercise = exerciseDetails.exercises.find((ex) => ex.selected) || exerciseDetails.exercises[0]

	// Format day name for display (capitalize first letter)
	const formattedDay = day_id.charAt(0).toUpperCase() + day_id.slice(1)

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Navbar />

			<main className="flex-grow flex flex-col items-center py-12 px-6 sm:px-10">
				<div className="w-full max-w-6xl">
					<BackButton />

					<h1 className="mt-8 text-3xl font-bold text-gray-900 mb-2">{exerciseDetails.title}</h1>
					<p className="text-gray-600 mb-8">
						Week {week_id}, {formattedDay}
					</p>

					<div className="bg-white rounded-lg shadow-md p-6 mb-6">
						{/* Exercise selection buttons */}
						<div className="flex flex-wrap gap-2 mb-6">
							{exerciseDetails.exercises.map((exercise, index) => (
								<button key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${exercise.selected ? 'bg-[#327689] text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
									{exercise.selected && <X className="inline-block h-4 w-4 mr-1" />}
									{exercise.name}
								</button>
							))}
						</div>

						<ExerciseForm exerciseType={exerciseDetails.type} selectedExercise={selectedExercise} initialDays={exerciseDetails.days} dayCodeToName={dayCodeToName} />
					</div>
				</div>
			</main>
		</div>
	)
}
