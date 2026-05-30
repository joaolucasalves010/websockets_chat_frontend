import { LogIn } from "lucide-react"

import { Input } from "@workspace/ui/components/input"
import { Field, FieldLabel } from "@workspace/ui/components/field"

import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@workspace/ui/components/button"

import { api } from "@/services/api"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "@/hooks/useAuth"

const SignInComponent = () => {

  const { getUser } = useAuth()

  const formSchema = z.object({
    phone: z.string().min(9, "O telefone deve ter no mínimo 9 caracteres").max(11, "O telefone deve ter no máximo 11 caracteres"),
    password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres").max(72, "A senha deve ter no máximo 72 caracters"),
  })

  type formData = z.infer<typeof formSchema>

  const navigate = useNavigate()
  const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm<formData>({ resolver: zodResolver(formSchema) })

  const onSubmit = async (data: formData) => {
    const user = {
      phone: data.phone,
      password: data.password,
    }

    try {
      const res = await api.post("/login", user, { withCredentials: true })
      if (res.status == 200) {
        getUser()
        navigate("/")
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('password', { message: 'Credenciais inválidas.' })
      }
    }
  }

  return (
    <div className="p-6 flex items-center justify-center flex-col w-full">
      <div className="bg-zinc-800 w-10 h-10 p-2 rounded-lg flex items-center justify-center">
        <LogIn size={25} className="text-white" />
      </div>
      <h1 className="font-bold text-lg mt-2">Bem-vindo de volta</h1>
      <p className="text-zinc-500 text-sm">Entre com suas credenciais para continuar</p>

      <form className="flex flex-col items-center justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <Field className="w-full mt-8">
          <FieldLabel htmlFor="phone">Telefone</FieldLabel>
          <Input
            id="phone"
            className="rounded-sm shadow-lg p-4"
            maxLength={11}
            placeholder="Digite seu telefone"
            {...register("phone", {
              onChange: (e) => {
                const cleaned_value = e.target.value.replace(/[^0-9]/g, "")
                setValue("phone", cleaned_value)
              }
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </Field>

        <Field className="w-full mt-5">
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            type="password"
            id="password"
            className="rounded-sm shadow-lg p-4"
            maxLength={72}
            placeholder="******"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </Field>

        <Button className="mt-5 w-full rounded-sm cursor-pointer hover:scale-[1.02]" type="submit">
          Entrar
        </Button>
      </form>

      <div className="w-full gap-2 items-center justify-between flex my-4">
        <div className="bg-zinc-200 h-px flex-1" />
        <p className="text-zinc-300 text-sm">ou</p>
        <div className="bg-zinc-200 h-px flex-1" />
      </div>

      <span className="text-sm">Não tem uma conta? <strong><Link to="/signup">Cadastrar</Link></strong></span>
    </div>
  )
}

export default SignInComponent