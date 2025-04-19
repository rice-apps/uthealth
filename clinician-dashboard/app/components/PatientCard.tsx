import Image from 'next/image'

interface PatientCardProps {
	id: string
}

export default function PatientCard({ id }: PatientCardProps) {
	return (
		<a href={`/patients/${id}`} className="block bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
			<div className="p-4">
				<div className="w-full h-32 rounded-md mb-4 flex items-center justify-center">
					<Image src="/ut-health-logo.png" alt="UTHealth Logo" width={100} height={100} priority />
				</div>
				<div className="text-center">
					<h2 className="text-xl font-semibold text-gray-800">{id}</h2>
					<p className="text-sm text-gray-500 mt-1">Open schedule</p>
				</div>
			</div>
		</a>
	)
}
