'use client'

import Image from 'next/image'
import AddClinicianDialog from './AddClinicianDialog'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Navbar() {
	const [clinicianId, setClinicianId] = useState<string | null>(null)

	useEffect(() => {
		async function fetchClinicianId() {
			const supabase = createClient()

			// Get the current user's ID from auth
			const {
				data: { user },
			} = await supabase.auth.getUser()

			if (user) {
				// Get the clinicianID from clinicians table using auth UUID
				const { data: clinician } = await supabase.from('clinicians').select('clinicianID').eq('id', user.id).single()

				if (clinician) {
					setClinicianId(clinician.clinicianID)
				}
			}
		}

		fetchClinicianId()
	}, [])

	return (
		<nav className="w-full py-4 px-6 border-b border-gray-200">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="flex items-center">
					<Image src="/ut-health-logo.png" alt="UTHealth Logo" width={50} height={50} priority />
					<span className="ml-3 text-xl font-semibold text-black">UTHealth Neurology</span>
				</div>
				<div className="flex items-center space-x-4">
					{clinicianId && (
						<div className="flex items-center space-x-2 bg-[#327689]/10 px-3 py-1.5 rounded-full">
							<span className="text-sm font-medium text-[#327689]">Your Clinician ID:</span>
							<span className="text-sm font-semibold text-[#327689]">{clinicianId}</span>
						</div>
					)}
					<AddClinicianDialog />
				</div>
			</div>
		</nav>
	)
}
