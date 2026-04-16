import { User } from "lucide-react"

import { Input } from "@workspace/ui/components/input"
import { Field, FieldLabel } from "@workspace/ui/components/field"

import z, { minLength } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@workspace/ui/components/button"

import { api } from "@/services/api"

const SignUpComponent = () => {

  const formSchema = z.object({
    username: z.string().min(8, "O nome de usuário deve ter no mínimo 8 caracteres.").max(20),
    phone: z.string().min(9, "O telefone deve ter no mínimo 9 caracteres").max(11, "O telefone deve ter no máximo 11 caracteres"),
    password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres").max(72, "A senha deve ter no máximo 72 caracters"),
    confirmPassword: z.string().min(6, "A senha deve conter no mínimo 6 caracteres").max(72, "A senha deve ter no máximo 72 caracters")
  }).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // importante pra mostrar erro no campo certo
  })

  type formData = z.infer<typeof formSchema>

  const {register, handleSubmit, setValue, formState: {errors}} = useForm<formData>({resolver: zodResolver(formSchema)})

  const onSubmit = (data: formData) => {
    console.log(data)
  }

  return (
    <div className="p-4 flex items-center justify-center flex-col w-full lg:w-md md:w-md">
      <div className="bg-zinc-800 w-10 h-10 p-2 rounded-lg flex items-center justify-center">
        <User size={25} className="text-white"/>
      </div>
      <h1 className="font-bold text-lg">Crie sua conta</h1>
      <p className="text-zinc-500 text-sm">Leva menos de um minuto para começar</p>
      <form className="flex flex-col items-center justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <Field className="w-[90%] mt-10">
          <FieldLabel htmlFor="username">Nome de usuário</FieldLabel>
          <Input className="rounded-sm shadow-lg p-4" id="username" maxLength={20} placeholder="Digite seu nome de usuário" {...register("username", {
            onChange: (e) => {
              const cleaned_value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "")
              setValue("username", cleaned_value)
            }
          })} />
        </Field>
        <Field className="w-[90%] mt-5">
          <FieldLabel htmlFor="phone">Telefone</FieldLabel>
          <Input id="phone" className="rounded-sm shadow-lg p-4" maxLength={11} placeholder="Digite seu telefone" {...register("phone")}/>    
        </Field>
        <Field className="w-[90%] mt-5">
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input type="password" id="password" className="rounded-sm shadow-lg p-4" maxLength={72} placeholder="******" {...register("password")}/>
        </Field>
        <Field className="w-[90%] mt-5">
          <FieldLabel htmlFor="confirmPassword">Confirmar senha</FieldLabel>
          <Input type="password" id="confirmPassword" className="rounded-sm shadow-lg p-4" maxLength={72} placeholder="******" {...register("confirmPassword")}/>
        </Field>
        <Button className="mt-5 w-[90%] rounded-sm cursor-pointer hover:scale-102" type="submit">Cadastrar</Button>
      </form>
    </div>
  )
}

export default SignUpComponent