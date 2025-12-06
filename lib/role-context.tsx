"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserRole = "talent" | "employer"

interface RoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("talent")

  // Load role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole | null
    if (savedRole === "talent" || savedRole === "employer") {
      setRoleState(savedRole)
    }
  }, [])

  // Save role to localStorage when it changes
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole)
    localStorage.setItem("userRole", newRole)
  }

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}
