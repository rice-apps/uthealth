'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signout() {
	const supabase = await createClient() // Added await here
	const { error } = await supabase.auth.signOut()
	if (error) {
		console.log(error)
		redirect('/login')
	}

	redirect('/logout')
}

export async function signInWithGoogle() {
	const supabase = await createClient()

	// Determine the redirect URL based on environment
	const redirectUrl = `http://localhost:3000/auth/callback`

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: redirectUrl,
			queryParams: {
				access_type: 'offline',
				prompt: 'consent',
			},
		},
	})

	if (error) {
		console.log(error.code)
		redirect(`/login?error=${error.code}`)
	}

	redirect(data.url)
}

export async function signInWithAzure() {
	const supabase = await createClient()

	const redirectUrl = `http://localhost:3000/auth/callback`

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'azure',
		options: {
			redirectTo: redirectUrl,
			scopes: 'email',
		},
	})

	if (error) {
		console.log(error.code)
		redirect(`/login?error=${error.code}`)
	}

	redirect(data.url)
}
