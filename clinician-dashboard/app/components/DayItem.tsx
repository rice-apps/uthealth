import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface DayItemProps {
	day: string
	patientId: string
	weekId: number
	exerciseId: number
	selected: boolean
}

export default function DayItem({ day, patientId, weekId, exerciseId, selected }: DayItemProps) {
	return (
		<Link href={`/patients/${patientId}/week/${weekId}/exercise/${exerciseId}/day/${day.toLowerCase()}`} className="block">
			<div className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center cursor-pointer hover:shadow-lg transition-shadow">
				<div>
					<h2 className="text-xl font-semibold text-[#327689]">{day}</h2>
					<p className="text-gray-500">{selected ? 'Selected' : 'None selected'}</p>
				</div>
				<ChevronRight className="h-6 w-6 text-gray-400" />
			</div>
		</Link>
	)
}
