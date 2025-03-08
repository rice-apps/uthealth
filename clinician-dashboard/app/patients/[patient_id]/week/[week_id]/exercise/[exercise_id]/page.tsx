import Navbar from '@/app/components/Navbar'
import BackButton from '@/app/components/BackButton'
import DayItem from '@/app/components/DayItem'

type Params = {
	params: {
		patient_id: string
		week_id: string
		exercise_id: string
	}
}

// Mock data for exercise details - in a real app, this would come from an API or database
const getExerciseDetails = (exerciseId: string) => {
	const exercises = {
		'1': { title: 'Weight Lifting', description: 'Strength training exercises' },
		'2': { title: 'Aerobics', description: 'Cardiovascular exercises' },
		'3': { title: 'Stretching', description: 'Flexibility exercises' },
		'4': { title: 'Balance Training', description: 'Stability exercises' },
	}

	return exercises[exerciseId as keyof typeof exercises] || { title: 'Unknown Exercise', description: '' }
}

// Mock data for days - in a real app, this would come from an API or database
const getDays = () => {
	return [
		{ day: 'Monday', selected: false },
		{ day: 'Tuesday', selected: false },
		{ day: 'Wednesday', selected: false },
		{ day: 'Thursday', selected: false },
		{ day: 'Friday', selected: false },
	]
}

export default async function ExerciseDetailPage({ params }: Params) {
	const { patient_id, week_id, exercise_id } = params
	const exerciseDetails = getExerciseDetails(exercise_id)
	const days = getDays()

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Navbar />

			<main className="flex-grow flex flex-col items-center py-12 px-6 sm:px-10">
				<div className="w-full max-w-6xl">
					<BackButton />

					<h1 className="mt-8 text-3xl font-bold text-gray-900 mb-8">{exerciseDetails.title}</h1>

					{exerciseDetails.description && <p className="text-gray-600 mb-8">{exerciseDetails.description}</p>}

					<div className="space-y-4">
						{days.map((day) => (
							<DayItem key={day.day} day={day.day} patientId={patient_id} weekId={parseInt(week_id)} exerciseId={parseInt(exercise_id)} selected={day.selected} />
						))}
					</div>
				</div>
			</main>
		</div>
	)
}
