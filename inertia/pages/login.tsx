import { Field, Label, Input, Fieldset, Button } from '@headlessui/react'
import { Head } from '@inertiajs/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

type FormData = {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('/api/auth/login', data)
      console.log(response)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Head title="Connexion" />
      <main className="h-screen lg:flex">
        <span
          className={`h-full w-full hidden lg:block bg-cover bg-center bg-[url(public/img/login_page_image.jpg)]`}
        ></span>
        <div className="flex flex-col justify-center space-y-10 h-full w-full sm:p-16 md:p-24 lg:p-16">
          <h1 className="text-3xl text-center font-semibold text-primary">PAWWWS.</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl text-center font-medium">Connexion</h2>
            <Fieldset className="flex flex-col space-y-6">
              <Field className="flex flex-col mx-4 space-y-1">
                <Label className="font-semibold text-lg" htmlFor="email">
                  Email
                </Label>
                <Input
                  className="border border-gray-300 rounded-lg p-3"
                  {...register('email', { required: true })}
                />
                {errors.email && <span className="text-error">Ce champ est requis</span>}
              </Field>
              <Field className="flex flex-col mx-4 space-y-1">
                <Label className="font-semibold text-lg" htmlFor="password">
                  Mot de passe
                </Label>
                <Input
                  type="password"
                  className="border border-gray-300 rounded-lg p-3"
                  {...register('password', { required: true })}
                />
                {errors.email && <span className="text-error">Ce champ est requis</span>}

                <a className="self-end underline hover:font-medium" href="#">
                  Mot de passe oublié ?
                </a>
              </Field>
              <Button
                className="text-center bg-primary text-white text-xl p-3 mx-4 rounded-lg font-semibold hover:bg-opacity-75 transition ease-in-out"
                type="submit"
              >
                Connexion
              </Button>
              <div className="flex justify-between items-center gap-4 mx-4">
                <hr className="w-full bg-gray-200 h-[2px]" />
                OU
                <hr className="w-full bg-gray-200 h-[2px]" />
              </div>
              <a href="/inscription" className="text-center text-lg underline hover:font-medium">
                Inscrivez-vous maintenant
              </a>
            </Fieldset>
          </form>
        </div>
      </main>
    </>
  )
}
