import { Head, Link, router } from '@inertiajs/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

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
      if (response.status === 200) {
        router.visit('/tableau-de-bord/animaux')
        toast.success('Vous êtes connecté !')
      }
    } catch (error) {
      toast.error('Email ou mot de passe incorrecte')
      console.log(error.message)
    }
  }

  return (
    <>
      <Head title="Connexion" />
      <main className="flex justify-between items-center h-screen">
        <section className="hidden lg:block h-full w-full bg-cover bg-center bg-[url(public/img/login_page_image.jpg)]"></section>
        <section className="flex flex-col justify-between items-center px-4 py-16 md:px-12 lg:px-24 h-screen w-full">
          <h1 className="text-primary text-2xl text-center font-semibold">PAWWWS.</h1>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="pb-10 space-y-2">
              <h2 className="text-center text-4xl font-medium">Ravis de vous revoir</h2>
              <p className="text-center font-light text-sm md:text-base">
                Entrez votre email et votre mot de passe afin de vous connecter.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
              <div className="flex flex-col justify-center items-start space-y-2">
                <label htmlFor="email" className="text-start">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Votre email"
                  className="border px-4 py-2 rounded-lg w-full border-gray-300"
                  {...register('email', {
                    required: true,
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                />
                {errors.email && (
                  <span className="text-error">L'email est requis et doit être valide</span>
                )}
              </div>
              <div className="flex flex-col justify-center items-start space-y-2">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  required
                  placeholder="Votre mot de passe"
                  className="border px-4 py-2 rounded-lg w-full border-gray-300"
                  {...register('password', { required: true, minLength: 8 })}
                />
                {errors.password && (
                  <span className="text-error">Le mot de passe est requis et doit être valide</span>
                )}
                <p className="self-end py-2">
                  <Link href="#" className="font-light hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="bg-primary rounded-lg w-full px-4 py-2 font-medium text-white hover:opacity-80 cursor-pointer transition-all shadow-sm"
              >
                Connexion
              </button>
            </form>
          </div>
          <div>
            <p className="font-light">
              Vous n'avez pas de compte ?{' '}
              <Link href="/inscription" className="font-medium hover:underline">
                Inscrivez-vous
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
