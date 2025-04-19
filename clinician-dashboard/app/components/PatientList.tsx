import { createClient } from '@/utils/supabase/server'
import PatientCard from './PatientCard'
import AddPatientDialog from './AddPatientDialog'
import AddPatientCard from './AddPatientCard'

export default async function PatientList() {
	const supabase = await createClient()

	// Get the current user's ID from auth
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		console.error('Error getting auth user:', authError)
		return <div>Error loading user data</div>
	}

	// First get the clinicianID from clinicians table using auth UUID
	const { data: clinician, error: clinicianError } = await supabase.from('clinicians').select('clinicianID').eq('id', user.id).single()

	if (clinicianError || !clinician) {
		console.error('Error fetching clinician:', clinicianError)
		return <div>Error loading clinician data</div>
	}

	// Then get all patients assigned to this clinicianID
	const { data: users, error: patientsError } = await supabase.from('users').select('patientID').eq('clinicianID', clinician.clinicianID).order('patientID')

	if (patientsError) {
		console.error('Error fetching patients:', patientsError)
		return <div>Error loading patients</div>
	}

	if (!users || users.length === 0) {
		return <div className="text-center p-8 text-gray-600">You have no patients with you. Share with them your clinician ID.</div>
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{users.map((user) => (
				<PatientCard key={user.patientID} id={user.patientID} />
			))}
		</div>
	)
}
