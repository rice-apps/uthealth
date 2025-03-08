'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import Navbar from '@/app/components/Navbar'

export default function LoginPage() {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('Login attempt with:', { email, password })
		// Uncomment when ready to implement actual navigation
		// router.push('/dashboard')
	}

	const handleGoogleLogin = () => {
		console.log('Google login clicked')
	}

	const handleAppleLogin = () => {
		console.log('Apple login clicked')
	}

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Navbar />

			{/* Login Content */}
			<div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Login</h2>
						<p className="mt-2 text-center text-sm text-gray-600">Sign in with your email</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<input id="email" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-[#327689] focus:border-[#327689] focus:z-10 sm:text-sm" placeholder="Email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
							</div>
							<div>
								<input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-[#327689] focus:border-[#327689] focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
							</div>
						</div>

						<div>
							<button type="submit" className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#327689] hover:bg-[#265e6d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#327689]">
								Sign In
							</button>
						</div>
					</form>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
							</div>
						</div>

						<div className="mt-6 grid gap-3">
							<button type="button" onClick={handleAppleLogin} className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
								<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
								</svg>
								Continue with Apple
							</button>

							<button type="button" onClick={handleGoogleLogin} className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
								<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
									<path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
								</svg>
								Continue with Google
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
