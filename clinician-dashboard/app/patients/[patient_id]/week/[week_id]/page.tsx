import Navbar from '@/app/components/Navbar'
import BackButton from '@/app/components/BackButton'
import ExerciseItem from '@/app/components/ExerciseItem'

type Params = {
	params: {
		patient_id: string
		week_id: string
	}
}

// Mock data for exercises - in a real app, this would come from an API or database
const getExercises = (weekId: string) => {
	// Using weekId to potentially filter exercises based on the week
	// In a real app, this would fetch data from an API based on the weekId
	console.log(`Fetching exercises for week ${weekId}`)

	return [
		{ id: 1, title: 'Weight Lifting', selected: false, description: 'Strength training exercises' },
		{ id: 2, title: 'Aerobics', selected: false, description: 'Cardiovascular exercises' },
		{ id: 3, title: 'Stretching', selected: false, description: 'Flexibility exercises' },
		{ id: 4, title: 'Balance Training', selected: false, description: 'Stability exercises' },
	]
}

export default async function WeekDetailPage({ params }: Params) {
	const { patient_id, week_id } = await params
	const exercises = getExercises(week_id)
	const weekTitle = `Week ${week_id} Schedule`

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Navbar />

			<main className="flex-grow flex flex-col items-center py-12 px-6 sm:px-10">
				<div className="w-full max-w-6xl">
					<BackButton />

					<h1 className="mt-8 text-3xl font-bold text-gray-900 mb-8">{weekTitle}</h1>

					<div className="space-y-4">
						{exercises.map((exercise) => (
							<ExerciseItem key={exercise.id} id={exercise.id} title={exercise.title} patientId={patient_id} weekId={parseInt(week_id)} selected={exercise.selected} description={exercise.description} />
						))}
					</div>
				</div>
			</main>
		</div>
	)
}
