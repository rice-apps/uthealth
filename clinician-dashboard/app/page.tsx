import Navbar from '@/app/components/Navbar'
import PatientList from '@/app/components/PatientList'

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Navbar />

			{/* Main Content */}
			<main className="flex-grow flex flex-col items-center py-12 px-6 sm:px-10">
				<div className="w-full max-w-6xl">
					<h1 className="text-3xl font-bold text-gray-900 mb-8">Select a patient</h1>
					<PatientList />
				</div>
			</main>
		</div>
	)
}
