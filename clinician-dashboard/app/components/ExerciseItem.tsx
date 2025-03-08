import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface ExerciseItemProps {
	id: number
	title: string
	patientId: string
	weekId: number
	selected: boolean
	description?: string
}

export default function ExerciseItem({ id, title, patientId, weekId, selected, description }: ExerciseItemProps) {
	return (
		<Link href={`/patients/${patientId}/week/${weekId}/exercise/${id}`} className="block">
			<div className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center cursor-pointer hover:shadow-lg transition-shadow">
				<div>
					<h2 className="text-xl font-semibold text-[#327689]">{title}</h2>
					<p className="text-gray-500">{selected ? 'Selected' : 'None selected'}</p>
					{description && <p className="text-gray-600 mt-2">{description}</p>}
				</div>
				<ChevronRight className="h-6 w-6 text-gray-400" />
			</div>
		</Link>
	)
}
