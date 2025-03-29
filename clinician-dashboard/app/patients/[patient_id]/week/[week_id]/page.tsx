import Navbar from '@/app/components/Navbar'
import BackButton from '@/app/components/BackButton'
import ExerciseGrid from '@/app/components/ExerciseGrid'
import { Exercise } from '@/app/components/ExerciseCard'

type Params = {
	params: {
		patient_id: string
		week_id: string // This will be comma-separated IDs like "1,2,3"
	}
}

// Mock data for exercises - in a real app, this would come from an API or database
const getExercises = (): Exercise[] => {
	// In a real app, this would fetch data from an API

	// Exercise data based on the reference
	return [
		{
			id: 1,
			name: 'Head Lift',
			tags: ['neck', 'supine'],
			description: 'Lying on a bench with horizontal head support',
		},
		{
			id: 2,
			name: 'Chin Tuck',
			tags: ['neck', 'sitting', 'standing'],
			description: 'Start standing or sitting straight up',
		},
		{
			id: 3,
			name: 'Lateral Neck Bend',
			tags: ['neck', 'supine'],
			description: 'Lie on your side, pull your chin in and put your head down',
		},
		{
			id: 4,
			name: 'Shoulder Shrug',
			tags: ['proximal', 'upper extremity', 'sitting', 'standing'],
			description: 'Sitting or standing without back support',
		},
		{
			id: 5,
			name: 'Hip Flexion',
			tags: ['proximal', 'lower extremity', 'supine'],
			description: 'Lying on a mat, pillow under head',
		},
		{
			id: 6,
			name: 'Pelvic Tilt',
			tags: ['proximal', 'lower extremity', 'supine'],
			description: 'Lie flat on your back on a mat',
		},
		{
			id: 7,
			name: 'Shoulder Flexion',
			tags: ['proximal', 'upper extremity', 'sitting'],
			description: 'Sit on a chair without back support',
		},
		{
			id: 8,
			name: 'Knee Lifts',
			tags: ['proximal', 'lower extremity', 'sitting'],
			description: 'Seated in a chair, with your arms resting by your side',
		},
		{
			id: 9,
			name: 'Shoulder Press',
			tags: ['proximal', 'upper extremity', 'sitting', 'standing'],
			description: 'Sitting down on a chair or standing. Hold dumbbell in each hand',
		},
		{
			id: 10,
			name: 'Pelvic Tilt with Band',
			tags: ['proximal', 'lower extremity', 'supine', 'resistance'],
			description: 'Lie on your back with your knees bent',
		},
	]
}

export default async function WeekDetailPage({ params }: Params) {
	const { patient_id, week_id } = await params

	// Parse the comma-separated week IDs
	const weekIds = week_id.split(',').map((id) => id.trim())

	// Get exercises
	const exercises = getExercises()

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

					<ExerciseGrid exercises={exercises} patientId={patient_id} weekId={week_id} />
				</div>
			</main>
		</div>
	)
}
