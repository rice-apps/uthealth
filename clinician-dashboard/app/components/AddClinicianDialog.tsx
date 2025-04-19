'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function AddClinicianDialog() {
	const [isOpen, setIsOpen] = useState(false)
	const [email, setEmail] = useState('')
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setIsLoading(true)

		try {
			const supabase = createClient()

			// First check if the user exists
			const { data: user, error: userError } = await supabase.from('users').select('user_uuid').eq('email', email).single()

			if (userError) {
				if (userError.code === 'PGRST116') {
					setError('The clinician did not sign up, please request them to sign up first and then add their email here again.')
				} else {
					setError('An error occurred while checking the email. Please try again.')
				}
				return
			}

			// If user exists, add them to clinicians table
			const { error: insertError } = await supabase.from('clinicians').insert([{ id: user.user_uuid }])

			if (insertError) {
				setError('An error occurred while adding the clinician. Please try again.')
				return
			}

			// Success - close dialog and reset form
			setEmail('')
			setIsOpen(false)
		} catch (err) {
			setError('An unexpected error occurred. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			{/* Trigger button */}
			<button onClick={() => setIsOpen(true)} className="text-[#327689] hover:text-[#265e6d] font-medium cursor-pointer">
				Add clinicians
			</button>

			{/* Dialog */}
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					{/* Backdrop */}
					<div className="absolute inset-0 backdrop-blur-sm bg-gray-800/30" onClick={() => setIsOpen(false)}></div>

					{/* Dialog content */}
					<div className="bg-white rounded-lg p-6 w-full max-w-md relative z-10 shadow-xl">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-gray-800">Add New Clinician</h2>
							<button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>

						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
									Clinician Email
								</label>
								<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter clinician's email" className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#327689]" required />
								{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
							</div>

							<div className="flex justify-end space-x-3">
								<button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
									Cancel
								</button>
								<button type="submit" disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-[#327689] rounded-md hover:bg-[#265e6d] disabled:opacity-70 disabled:cursor-not-allowed">
									{isLoading ? 'Adding...' : 'Add Clinician'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}
