export default function AddPatientCard() {
	return (
		<div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
			<div className="p-4 flex flex-col items-center justify-center h-full">
				<div className="w-12 h-12 rounded-full bg-[#327689] flex items-center justify-center mb-2">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
					</svg>
				</div>
				<h2 className="text-xl font-semibold text-gray-800">Add Patient</h2>
			</div>
		</div>
	)
}
