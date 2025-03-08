// Shows all the weeks here.

import Navbar from '@/app/components/Navbar'
import WeekItem from '@/app/components/WeekItem'
import BackButton from '@/app/components/BackButton'

type Params = {
	params: {
		patient_id: string
	}
}

export default async function PatientSchedulePage({ params }: Params) {
	const { patient_id } = await params

	// In a real app, you would fetch this data from an API
	const weeks = [
		{ id: 1, title: 'Week 1', selected: false },
		{ id: 2, title: 'Week 2', selected: false },
		{ id: 3, title: 'Week 3', selected: false },
		{ id: 4, title: 'Week 4', selected: false },
		{ id: 5, title: 'Week 5', selected: false },
	]

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Navbar />

			<main className="flex-grow flex flex-col items-center py-12 px-6 sm:px-10">
				<div className="w-full max-w-6xl">
					<BackButton />

					<h1 className="mt-8 text-3xl font-bold text-gray-900 mb-8">Current Schedule:</h1>

					<div className="space-y-4">
						{weeks.map((week) => (
							<WeekItem key={week.id} id={week.id} title={week.title} patientId={patient_id} selected={week.selected} />
						))}
					</div>
				</div>
			</main>
		</div>
	)
}
