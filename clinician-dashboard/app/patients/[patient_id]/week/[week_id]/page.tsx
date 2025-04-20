import Navbar from '@/app/components/Navbar'
import BackButton from '@/app/components/BackButton'
import ExerciseGrid from '@/app/components/ExerciseGrid'
import { Exercise } from '@/app/components/ExerciseCard'
import { createClient } from '@/utils/supabase/server'

type Params = {
	params: {
		patient_id: string
		week_id: string
	}
}

// Fetch exercises from Supabase
const getExercises = async (): Promise<Exercise[]> => {
	const supabase = await createClient()

	const { data, error } = await supabase.from('exercises').select('*').order('exercise_id')

	if (error) {
		console.error('Error fetching exercises:', error)
		return []
	}

	// Transform the data to match the Exercise type
	return data.map((exercise) => ({
		exercise_id: exercise.exercise_id,
		name: exercise.name,
		tags: exercise.tags,
		description: exercise.description,
		type: exercise.type,
	}))
}

export default async function WeekDetailPage({ params }: Params) {
	// Await the params object
	const { patient_id, week_id } = await params

	// Decode the URL-encoded week_id and split by comma
	const decodedWeekId = decodeURIComponent(week_id)
	const weekIds = decodedWeekId.split(',')

	// Format each week ID to be more readable
	const formatWeekId = (weekId: string) => {
		// Extract year and week number from format "2025-W16"
		const [year, week] = weekId.split('-W')
		return `W${week}-${year}`
	}

	// Helper function to join array items with commas and 'and'
	const formatList = (items: string[]) => {
		if (items.length <= 1) return items[0]
		if (items.length === 2) return `${items[0]} and ${items[1]}`
		return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
	}

	// Get exercises
	const exercises = await getExercises()

	// Create title based on selected weeks
	const formattedWeeks = weekIds.map(formatWeekId)
	const weekTitle = weekIds.length === 1 ? `${formattedWeeks[0]} Schedule` : `${formatList(formattedWeeks)} Schedule`

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Navbar />

			<main className="flex-grow flex flex-col items-center py-12 px-6 sm:px-10">
				<div className="w-full max-w-6xl">
					<BackButton />

					<h1 className="mt-8 text-3xl font-bold text-gray-900 mb-8">{weekTitle}</h1>

					<p className="mb-6 text-gray-600">{weekIds.length === 1 ? `Showing exercises for ${formattedWeeks[0]}` : `Showing exercises for ${formatList(formattedWeeks)}`}</p>

					<ExerciseGrid exercises={exercises} patientId={patient_id} weekId={week_id} />
				</div>
			</main>
		</div>
	)
}
