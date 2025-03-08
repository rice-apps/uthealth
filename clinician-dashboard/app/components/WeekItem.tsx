import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface WeekItemProps {
	id: number
	title: string
	patientId: string
	selected: boolean
}

export default function WeekItem({ id, title, patientId, selected }: WeekItemProps) {
	return (
		<Link href={`/patients/${patientId}/week/${id}`} className="block">
			<div className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center cursor-pointer hover:shadow-lg transition-shadow">
				<div>
					<h2 className="text-xl font-semibold text-[#327689]">{title}</h2>
					<p className="text-gray-500">{selected ? 'Selected' : 'None selected'}</p>
				</div>
				<ChevronRight className="h-6 w-6 text-gray-400" />
			</div>
		</Link>
	)
}
