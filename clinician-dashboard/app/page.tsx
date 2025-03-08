import Navbar from '@/app/components/Navbar'
import PatientCard from '@/app/components/PatientCard'
import AddPatientCard from '@/app/components/AddPatientCard'
import AddPatientDialog from '@/app/components/AddPatientDialog'

export default function Home() {
	const patientIds = ['12345', '23456', '34567', '45678']

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Navbar />

			{/* Main Content */}
			<main className="flex-grow flex flex-col items-center py-12 px-6 sm:px-10">
				<div className="w-full max-w-6xl">
					<h1 className="text-3xl font-bold text-gray-900 mb-8">Select a Patient</h1>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{/* Patient Cards */}
						{patientIds.map((id) => (
							<PatientCard key={id} id={id} />
						))}

						{/* Add Patient Card */}
						<AddPatientDialog>
							<AddPatientCard />
						</AddPatientDialog>
					</div>
				</div>
			</main>
		</div>
	)
}
