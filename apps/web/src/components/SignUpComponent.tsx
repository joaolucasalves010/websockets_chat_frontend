import { User } from "lucide-react"

import { Input } from "@workspace/ui/components/input"
import { Field, FieldLabel } from "@workspace/ui/components/field"

import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@workspace/ui/components/button"

import { api } from "@/services/api"
import { Link, useNavigate } from "react-router-dom"

const SignUpComponent = () => {

  const formSchema = z.object({
    username: z.string().min(8, "O nome de usuário deve ter no mínimo 8 caracteres.").max(20),
    phone: z.string().min(9, "O telefone deve ter no mínimo 9 caracteres").max(11, "O telefone deve ter no máximo 11 caracteres"),
    password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres").max(72, "A senha deve ter no máximo 72 caracters"),
    confirmPassword: z.string().min(6, "A senha deve conter no mínimo 6 caracteres").max(72, "A senha deve ter no máximo 72 caracters")
  }).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
  })

  type formData = z.infer<typeof formSchema>

  const navigate = useNavigate()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<formData>({ resolver: zodResolver(formSchema) })

  const onSubmit = async (data: formData) => {
    const res = await api.post("/users/create_user/", {
      "username": data.username,
      "password": data.password,
      "phone": data.phone,
    })

    if (res.status == 200) {
      await api.post("/login", {
        "phone": data.phone,
        "password": data.password
      }, { withCredentials: true })

      navigate("/")
    }
  }

  return (
    <div className="p-6 flex items-center justify-center flex-col w-full">
      <div className="bg-zinc-800 w-10 h-10 p-2 rounded-lg flex items-center justify-center">
        <User size={25} className="text-white" />
      </div>
      <h1 className="font-bold text-lg mt-2">Crie sua conta</h1>
      <p className="text-zinc-500 text-sm">Leva menos de um minuto para começar</p>

      <form className="flex flex-col items-center justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <Field className="w-full mt-8">
          <FieldLabel htmlFor="username">Nome de usuário</FieldLabel>
          <Input
            className="rounded-sm shadow-lg p-4"
            id="username"
            maxLength={20}
            placeholder="Digite seu nome de usuário"
            {...register("username", {
              onChange: (e) => {
                const cleaned_value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "")
                setValue("username", cleaned_value)
              }
            })}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
          )}
        </Field>

        <Field className="w-full mt-5">
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

        <Field className="w-full mt-5">
          <FieldLabel htmlFor="confirmPassword">Confirmar senha</FieldLabel>
          <Input
            type="password"
            id="confirmPassword"
            className="rounded-sm shadow-lg p-4"
            maxLength={72}
            placeholder="******"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </Field>

        <Button className="mt-5 w-full rounded-sm cursor-pointer hover:scale-[1.02]" type="submit">
          Cadastrar
        </Button>
      </form>

      <div className="w-full gap-2 items-center justify-between flex my-4">
        <div className="bg-zinc-200 h-px flex-1" />
        <p className="text-zinc-300 text-sm">ou</p>
        <div className="bg-zinc-200 h-px flex-1" />
      </div>

      <span className="text-sm">Já tem uma conta? <strong><Link to="/signin">Entrar</Link></strong></span>
    </div>
  )
}

export default SignUpComponent