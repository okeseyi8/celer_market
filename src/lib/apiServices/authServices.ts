import api from "../api"

export const register = async (payload: any) =>{
   const res = await api.post("/auth/register", payload)
   return res.data

}
export const login = async (payload: any) =>{
   const res = await api.post("/auth/login", payload)
   return res.data

}