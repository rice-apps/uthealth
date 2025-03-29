'use client'

import { Check, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Week, generateFutureWeeks } from '@/app/patients/[patient_id]/page'

interface WeekSelectorProps {
	initialWeeks: Week[]
	patientId: string
}

export default function WeekSelector({ initialWeeks, patientId }: WeekSelectorProps) {
	const [weeks, setWeeks] = useState<Week[]>(initialWeeks)
	const [selectedWeeks, setSelectedWeeks] = useState<string[]>([])
	const [loading, setLoading] = useState(false)
	const loaderRef = useRef<HTMLDivElement>(null)
	const currentOffset = useRef(initialWeeks.length)

	const toggleWeek = (weekId: string) => {
		setSelectedWeeks((prev) => (prev.includes(weekId) ? prev.filter((id) => id !== weekId) : [...prev, weekId].sort()))
	}

	// Function to format the week ID (e.g., '2025-W12') into a readable title (e.g., 'Week 12, 2025')
	const formatWeekTitle = (weekId: string) => {
		const [year, weekPart] = weekId.split('-')
		const weekNumber = weekPart.substring(1) // Remove the 'W' prefix
		return `Week ${weekNumber}, ${year}`
	}

	// Function to calculate the date range for a given ISO week
	const getWeekDateRange = (weekId: string) => {
		// Parse year and week number from ISO format
		const [year, weekPart] = weekId.split('-')
		const weekNumber = parseInt(weekPart.substring(1)) // Remove the 'W' prefix
		const yearNumber = parseInt(year)

		// Get the first day of the year
		const firstDayOfYear = new Date(yearNumber, 0, 1)

		// Calculate days to first day of week (Monday)
		// getDay() returns 0 for Sunday, 1 for Monday, etc.
		const daysOffset = firstDayOfYear.getDay() <= 1 ? firstDayOfYear.getDay() + 6 : firstDayOfYear.getDay() - 1

		// Calculate first day of first week
		// If week 1 doesn't start in the current year, we need to adjust
		const firstWeekStart = new Date(yearNumber, 0, 1 + (1 - daysOffset))

		// Calculate the start of our target week
		// (weekNumber - 1) because we already have the first week start
		const weekStart = new Date(firstWeekStart)
		weekStart.setDate(firstWeekStart.getDate() + (weekNumber - 1) * 7)

		// Calculate the end of the week (6 days later)
		const weekEnd = new Date(weekStart)
		weekEnd.setDate(weekStart.getDate() + 6)

		// Format dates
		const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
		const startFormatted = weekStart.toLocaleDateString('en-US', options)
		const endFormatted = weekEnd.toLocaleDateString('en-US', options)

		return `${startFormatted} - ${endFormatted}, ${year}`
	}

	// Function to load more weeks
	const loadMoreWeeks = useCallback(() => {
		if (loading) return

		setLoading(true)

		// Simulate API call with a timeout
		setTimeout(() => {
			// Generate 5 more future weeks
			const moreWeeks = generateFutureWeeks(currentOffset.current + 5).slice(currentOffset.current)
			currentOffset.current += 5

			setWeeks((prevWeeks) => [...prevWeeks, ...moreWeeks])
			setLoading(false)
		}, 500)
	}, [loading])

	// Set up intersection observer for infinite scrolling
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMoreWeeks()
				}
			},
			{ threshold: 0.1 }
		)

		if (loaderRef.current) {
			observer.observe(loaderRef.current)
		}

		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current)
			}
		}
	}, [loadMoreWeeks])

	return (
		<>
			{/* Add padding at the bottom to ensure content isn't hidden behind the fixed button */}
			<div className="space-y-4 pb-20">
				{weeks.map((week) => (
					<div key={week.id} onClick={() => toggleWeek(week.id)} className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center cursor-pointer hover:shadow-lg transition-shadow">
						<div>
							<h2 className="text-xl font-semibold text-[#327689]">{formatWeekTitle(week.id)}</h2>
							<p className="text-gray-500">{selectedWeeks.includes(week.id) ? 'Selected' : getWeekDateRange(week.id)}</p>
						</div>
						<div className="flex items-center space-x-2">
							{selectedWeeks.includes(week.id) ? (
								<div className="bg-[#327689] p-1 rounded-md">
									<Check className="h-5 w-5 text-white" />
								</div>
							) : (
								<div className="border-2 border-gray-300 h-7 w-7 rounded-md"></div>
							)}
						</div>
					</div>
				))}

				{/* Loading indicator and intersection observer target */}
				<div ref={loaderRef} className="py-4 text-center">
					{loading ? (
						<div className="flex justify-center items-center space-x-2">
							<div className="w-4 h-4 rounded-full bg-[#327689] animate-pulse"></div>
							<div className="w-4 h-4 rounded-full bg-[#327689] animate-pulse delay-150"></div>
							<div className="w-4 h-4 rounded-full bg-[#327689] animate-pulse delay-300"></div>
							<span className="text-gray-500 ml-2">Loading more weeks...</span>
						</div>
					) : (
						<div className="h-4"></div> // Invisible element for intersection detection
					)}
				</div>
			</div>

			{/* Fixed button container at the bottom of the viewport */}
			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
				<div className="w-full max-w-6xl mx-auto flex justify-end">
					<Link href={`/patients/${patientId}/week/${selectedWeeks.join(',')}`} className={`px-6 py-3 rounded-lg font-medium text-white ${selectedWeeks.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#327689] hover:bg-[#265E6E]'}`} aria-disabled={selectedWeeks.length === 0} onClick={(e) => selectedWeeks.length === 0 && e.preventDefault()}>
						Next <ChevronRight className="inline ml-1 h-5 w-5" />
					</Link>
				</div>
			</div>
		</>
	)
}
