import React, { createContext, useState } from 'react'
import { User } from '../../user/User'

export interface OnboardingContextType {
    user: User
    setUser: (user: User) => void
}

export const OnboardingContext = createContext<OnboardingContextType | null>(
    null
)

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState(new User())

    return (
        <OnboardingContext.Provider value={{ user, setUser }}>
            {children}
        </OnboardingContext.Provider>
    )
}
