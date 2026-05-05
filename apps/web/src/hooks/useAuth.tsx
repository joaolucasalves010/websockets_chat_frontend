import React, { useContext, useState } from 'react'
import { api } from '@/services/api'
import { UserContext } from '@/contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {

  const [isLoading, setIsLoading] = useState(true)
  const {setUser} = useContext(UserContext)!

  const navigate = useNavigate()

  const logout = async () => {
    setUser(null)
    api.get("/logout")
    navigate("/signin")
  }

  const getUser = async () => {
    try {
      const res = await api.get("/users/me", { withCredentials: true })

      if (res.status == 200) {
        const data = await res.data
        setUser(data)
        console.log(res.data)
      }
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status == 422) {
        await logout()
      } else {
        console.error("Erro inesperado:", err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {isLoading, getUser}
}

export default useAuth