'use client'

import { useState, ReactNode } from 'react'

interface AddPatientDialogProps {
	children: ReactNode
}

export default function AddPatientDialog({ children }: AddPatientDialogProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [patientId, setPatientId] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// Basic validation
		if (!patientId.trim()) {
			setError('Patient ID is required')
			return
		}

		// Clear any previous errors
		setError('')

		// In a real app, you would add the patient to the database here
		// For now, we'll just close the dialog
		console.log('Adding patient:', patientId)

		// Reset the form
		setPatientId('')

		// Close the dialog
		setIsOpen(false)
	}

	return (
		<>
			{/* Trigger element */}
			<div onClick={() => setIsOpen(true)}>{children}</div>

			{/* Dialog */}
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					{/* Backdrop with blur effect */}
					<div className="absolute inset-0 backdrop-blur-sm bg-gray-800/30" onClick={() => setIsOpen(false)}></div>

					{/* Dialog content */}
					<div className="bg-white rounded-lg p-6 w-full max-w-md relative z-10 shadow-xl">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-gray-800">Add New Patient</h2>
							<button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>

						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
									Patient ID
								</label>
								<input type="text" id="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Enter patient ID" className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#327689]" />
								{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
							</div>

							<div className="flex justify-end space-x-3">
								<button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
									Cancel
								</button>
								<button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#327689] rounded-md hover:bg-[#265e6d]">
									Add Patient
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}
