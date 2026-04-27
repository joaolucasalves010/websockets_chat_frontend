import type { User } from '@/types/User'
import {type ReactNode } from 'react'

import { createContext, useState } from 'react'

interface UserContextType {
  user: User | null,
  setUser: (user: User | null) => void
}

export const UserContext = createContext<UserContextType | null>(null)

const UserProvider = ({children}: {children: ReactNode}) => {

  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider> 
  )
}

export default UserProvider