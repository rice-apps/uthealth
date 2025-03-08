'use client'

import { useState } from 'react'

interface DaySelectorProps {
	initialSelectedDays: string[]
	dayCodeToName: Record<string, string>
}

export default function DaySelector({ initialSelectedDays, dayCodeToName }: DaySelectorProps) {
	const [selectedDays, setSelectedDays] = useState<string[]>(initialSelectedDays || [])

	// Toggle day selection
	const toggleDay = (day: string) => {
		if (selectedDays.includes(day)) {
			setSelectedDays(selectedDays.filter((d) => d !== day))
		} else {
			setSelectedDays([...selectedDays, day])
		}
	}

	return (
		<div className="flex flex-wrap gap-2">
			{Object.entries(dayCodeToName).map(([code, name]) => (
				<button key={code} onClick={() => toggleDay(name)} className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${selectedDays.includes(name) ? 'bg-[#327689] text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
					{code}
				</button>
			))}
		</div>
	)
}
