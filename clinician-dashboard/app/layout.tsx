import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
})

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#327689',
}

export const metadata: Metadata = {
	title: 'UTHealth Neurology Dashboard',
	description: 'Clinician dashboard for UTHealth Neurology',
	icons: {
		icon: [
			{
				url: '/ut-health-logo.png',
				sizes: 'any',
			},
			{
				url: '/ut-health-logo.png',
				type: 'image/png',
				sizes: '32x32',
			},
			{
				url: '/ut-health-logo.png',
				type: 'image/png',
				sizes: '180x180',
			},
		],
		apple: [
			{
				url: '/ut-health-logo.png',
				sizes: '180x180',
			},
		],
	},
	manifest: '/site.webmanifest',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.className} antialiased`}>{children}</body>
		</html>
	)
}
