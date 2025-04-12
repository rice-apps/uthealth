'use client'

import Navbar from '@/app/components/Navbar'

export default function LoginPage() {
	const handleMicrosoftLogin = () => {
		console.log('Apple login clicked')
	}

	const handleGoogleLogin = () => {
		console.log('Google login clicked')
	}

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Navbar />

			{/* Login Content */}
			<div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Login</h2>
						<p className="mt-2 text-center text-sm text-gray-600">Sign in to access the dashboard</p>
					</div>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
						</div>

						<div className="mt-6 grid gap-3">
							<button type="button" onClick={handleGoogleLogin} className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
								<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
									<path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
								</svg>
								Continue with Google
							</button>

							<button type="button" onClick={handleMicrosoftLogin} className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
								<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 23 23" aria-hidden="true">
									<path d="M0 0h11v11H0V0zm12 0h11v11H12V0zM0 12h11v11H0V12zm12 0h11v11H12V12z" />
								</svg>
								Continue with Microsoft
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
