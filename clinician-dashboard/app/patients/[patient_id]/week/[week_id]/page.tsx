import Navbar from '@/app/components/Navbar'
import BackButton from '@/app/components/BackButton'
import ExerciseItem from '@/app/components/ExerciseItem'

type Params = {
	params: {
		patient_id: string
		week_id: string // This will be comma-separated IDs like "1,2,3"
	}
}

// Mock data for exercises - in a real app, this would come from an API or database
const getExercisesForWeek = (weekId: string) => {
	// In a real app, this would fetch data from an API based on the weekId
	console.log(`Fetching exercises for week ${weekId}`)

	// Simulate different exercises for different weeks
	const baseExercises = [
		{ id: 1, title: 'Weight Lifting', selected: false, description: 'Strength training exercises' },
		{ id: 2, title: 'Aerobics', selected: false, description: 'Cardiovascular exercises' },
		{ id: 3, title: 'Stretching', selected: false, description: 'Flexibility exercises' },
		{ id: 4, title: 'Balance Training', selected: false, description: 'Stability exercises' },
	]

	// Add a week-specific exercise for demonstration
	return [
		...baseExercises,
		{
			id: 100 + parseInt(weekId),
			title: `Week ${weekId} Special Exercise`,
			selected: false,
			description: `Special exercise program for week ${weekId}`,
		},
	]
}

// Get exercises for multiple weeks
const getExercises = (weekIds: string[]) => {
	if (weekIds.length === 1) {
		return getExercisesForWeek(weekIds[0])
	}

	// For multiple weeks, combine exercises from all selected weeks
	// In a real app, you might want to merge similar exercises or handle this differently
	const allExercises: {
		id: number
		title: string
		selected: boolean
		description: string
		weeks?: string[]
	}[] = []

	// Collect exercises from each week
	weekIds.forEach((weekId) => {
		const weekExercises = getExercisesForWeek(weekId)

		weekExercises.forEach((exercise) => {
			// Check if we already have this exercise
			const existingExercise = allExercises.find((e) => e.id === exercise.id)

			if (existingExercise) {
				// If the exercise already exists, just add this week to its weeks array
				existingExercise.weeks = [...(existingExercise.weeks || []), weekId]
			} else {
				// Otherwise add the exercise to our collection with this week
				allExercises.push({
					...exercise,
					weeks: [weekId],
				})
			}
		})
	})

	// For each exercise, update the description to show which weeks it belongs to
	return allExercises.map((exercise) => ({
		...exercise,
		description: exercise.weeks && exercise.weeks.length > 1 ? `${exercise.description} (Weeks: ${exercise.weeks.join(', ')})` : exercise.description,
	}))
}

export default async function WeekDetailPage({ params }: Params) {
	const { patient_id, week_id } = await params

	// Parse the comma-separated week IDs
	const weekIds = week_id.split(',').map((id) => id.trim())

	// Get exercises for the selected weeks
	const exercises = getExercises(weekIds)

	// Create title based on selected weeks
	const weekTitle = weekIds.length === 1 ? `Week ${weekIds[0]} Schedule` : `Weeks ${weekIds.join(', ')} Schedule`

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Navbar />

			<main className="flex-grow flex flex-col items-center py-12 px-6 sm:px-10">
				<div className="w-full max-w-6xl">
					<BackButton />

					<h1 className="mt-8 text-3xl font-bold text-gray-900 mb-8">{weekTitle}</h1>

					<p className="mb-6 text-gray-600">{weekIds.length === 1 ? `Showing exercises for Week ${weekIds[0]}` : `Showing exercises for all selected weeks: ${weekIds.join(', ')}`}</p>

					<div className="space-y-4">
						{exercises.map((exercise) => (
							<ExerciseItem
								key={exercise.id}
								id={exercise.id}
								title={exercise.title}
								patientId={patient_id}
								weekId={parseInt(weekIds[0])} // For backward compatibility, pass the first week ID
								selected={exercise.selected}
								description={exercise.description}
							/>
						))}
					</div>
				</div>
			</main>
		</div>
	)
}
