// Shows all the weeks here.

import Navbar from '@/app/components/Navbar'
import BackButton from '@/app/components/BackButton'
import WeekSelector from '@/app/components/WeekSelector'

type Params = {
	params: {
		patient_id: string
	}
}

// Define week type - exporting for use in the client component
export type Week = {
	id: string // ISO 8601 format (e.g., '2025-W12')
	selected: boolean
}

// Helper function to generate ISO week string from date
export function getISOWeek(date: Date): string {
	// Create a copy of the date to avoid modifying the original
	const d = new Date(date)
	d.setHours(0, 0, 0, 0)

	// Find Thursday of this week starting on Monday
	d.setDate(d.getDate() + 4 - (d.getDay() || 7))

	// Get first day of year
	const yearStart = new Date(d.getFullYear(), 0, 1)

	// Calculate full weeks to nearest Thursday
	const weekNum = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)

	// Return ISO 8601 format string
	return `${d.getFullYear()}-W${weekNum.toString().padStart(2, '0')}`
}

// Generate a list of weeks starting from the current week going forward into the future
export function generateFutureWeeks(count: number): Week[] {
	const weeks: Week[] = []
	const currentDate = new Date()

	for (let i = 0; i < count; i++) {
		// Create a new date for each week
		const weekDate = new Date()
		// Go forward i weeks from current date
		weekDate.setDate(currentDate.getDate() + i * 7)

		// Get ISO week string
		const weekId = getISOWeek(weekDate)

		weeks.push({
			id: weekId,
			selected: false,
		})
	}

	return weeks
}

export default async function PatientSchedulePage({ params }: Params) {
	const { patient_id } = await params

	// Generate 10 future weeks (will load more on scroll)
	const initialWeeks = generateFutureWeeks(10)

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Navbar />

			<main className="flex-grow flex flex-col items-center py-12 px-6 sm:px-10">
				<div className="w-full max-w-6xl">
					<BackButton />

					<h1 className="mt-8 text-3xl font-bold text-gray-900 mb-8">Select Weeks:</h1>

					<WeekSelector initialWeeks={initialWeeks} patientId={patient_id} />
				</div>
			</main>
		</div>
	)
}
