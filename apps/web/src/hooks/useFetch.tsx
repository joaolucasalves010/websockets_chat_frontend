import { UserContext } from '@/contexts/UserContext'
import { api } from '@/services/api'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


const useFetch = () => {
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)!

  const getUser = async() => {
    try {
      const res = await api.get("/users/me", {withCredentials: true})

      if (res.status == 200) {
        setUser(res.data)
      }
    } catch (err: any) {
      console.log(err)
      setUser(null)
      navigate("/signin")
    }
  }  

  return getUser
}

export default useFetch