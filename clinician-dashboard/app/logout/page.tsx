import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const LogoutPage = async function () {
	const supabase = await createClient() // Added await here
	const { error } = await supabase.auth.signOut()
	if (error) {
		console.log(error)
		redirect('/?error=logout_failed')
	}

	redirect('/login?logged_out=1')
}

export default LogoutPage
