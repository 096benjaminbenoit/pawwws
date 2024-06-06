import { Head, Link, router } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

type FormData = {
  email: string
  password: string
  name: string
  telephone: string
  address: string
  postalCode: string
  city: string
  country: string
}

export default function Registration() {
  const [stepIndex, setStepIndex] = useState(1)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isValide, setIsValide] = useState<boolean>(false)

  const verifyFirstStep = () => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && password.length > 7) {
      setIsValide(true)
    } else {
      setIsValide(false)
    }
  }

  useEffect(() => {
    verifyFirstStep()
  }, [email, password])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('/api/auth/register', data)
      if (response.status === 201) {
        router.visit('/tableau-de-bord/animaux')
        toast.success('Votre compte a bien été créé !')
      }
    } catch (error) {
      toast.error("Votre compte n'a pas pu être créé")
      console.log(error.message)
    }
  }

  return (
    <>
      <Head title="Inscription" />
      <main className="flex justify-between items-center h-screen">
        <section className="hidden lg:block h-full w-full bg-cover bg-center bg-[url(public/img/registration_page_image.jpg)]"></section>
        <section className="flex flex-col justify-between items-center px-4 py-16 md:px-12 lg:px-24 h-screen w-full">
          <h1 className="text-primary text-2xl text-center font-semibold">PAWWWS.</h1>
          <div className="flex flex-col justify-center items-center w-full mb-4 md:mb-0">
            <div className="space-y-2">
              <h2 className="text-center text-4xl font-medium">Créer un compte</h2>
            </div>
            <div className="flex flex-col justify-center mx-4 space-y-1 pt-2 pb-4 w-full">
              <p className="text-center font-light">
                {stepIndex === 1
                  ? 'Entrez des informations de connexion.'
                  : 'Entrez les informations de votre structure.'}
              </p>
              <p className="text-gray-500">Étape {stepIndex} sur 2</p>
              <div className="h-2 rounded-full w-full bg-gray-200">
                <span
                  className={`block bg-primary h-2 ${stepIndex === 1 ? 'w-1/2' : 'w-full'} rounded-full transition-all ease-in-out duration-300`}
                ></span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
              <>
                <div
                  className={`flex flex-col justify-center items-start space-y-2 ${stepIndex === 1 ? 'flex' : 'hidden'}`}
                >
                  <label htmlFor="email" className="text-start">
                    Email
                    <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    required
                    className="border px-4 py-2 rounded-lg w-full border-gray-300"
                    {...register('email', {
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                    })}
                  />
                  {errors.email && (
                    <span className="text-error">L'email est requis et doit être valide</span>
                  )}
                </div>
                <div
                  className={`flex flex-col justify-center items-start space-y-2 ${stepIndex === 1 ? 'flex' : 'hidden'}`}
                >
                  <label htmlFor="password">
                    Mot de passe
                    <span className="text-error">*</span>
                  </label>
                  <input
                    placeholder="••••••••"
                    type="password"
                    required
                    className="border px-4 py-2 rounded-lg w-full border-gray-300"
                    {...register('password', {
                      required: true,
                      minLength: 8,
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                    })}
                  />
                  {errors.password && (
                    <span className="text-error">
                      Le mot de passe est requis et doit faire 8 caractères minimum
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setStepIndex(2)}
                  disabled={!isValide}
                  className={`${isValide ? 'bg-primary cursor-pointer hover:opacity-80' : 'bg-gray-300 cursor-not-allowed'} rounded-lg w-full px-4 py-2 font-medium text-white   transition-all shadow-sm ${stepIndex === 1 ? 'block' : 'hidden'}`}
                >
                  Continuer
                </button>
              </>
              <>
                <button
                  onClick={() => setStepIndex(1)}
                  className={`cursor-pointer hover:underline flex justify-start items-center gap-3 ${stepIndex === 2 ? 'flex' : 'hidden'}`}
                >
                  <ArrowUturnLeftIcon className="w-4" />
                  Revenir à l'étape précédente
                </button>
                <div
                  className={`flex flex-col justify-center items-start space-y-2 ${stepIndex === 2 ? 'flex' : 'hidden'}`}
                >
                  <label htmlFor="name" className="text-start">
                    Nom de la sctucture
                    <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nom de la structure"
                    className="border px-4 py-2 rounded-lg w-full border-gray-300"
                    {...register('name', {
                      required: true,
                    })}
                  />
                  {errors.name && <span className="text-error">Le nom est requis</span>}
                </div>
                <div
                  className={`flex flex-col justify-center items-start space-y-2 ${stepIndex === 2 ? 'flex' : 'hidden'}`}
                >
                  {' '}
                  <label htmlFor="telephone" className="text-start">
                    Téléphone
                    <span className="text-error">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0612345678"
                    className="border px-4 py-2 rounded-lg w-full border-gray-300"
                    {...register('telephone', {
                      required: true,
                      pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                    })}
                  />
                  {errors.telephone && (
                    <span className="text-error">Le téléphone est requis et doit être valide</span>
                  )}
                </div>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${stepIndex === 2 ? 'flex' : 'hidden'}`}
                >
                  <div className="flex flex-col justify-center items-start space-y-2">
                    <label htmlFor="address" className="text-start">
                      Adresse
                      <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Numéro, rue"
                      required
                      className="border px-4 py-2 rounded-lg w-full border-gray-300"
                      {...register('address', {
                        required: true,
                      })}
                    />
                    {errors.address && <span className="text-error">L'addresse est requise</span>}
                  </div>{' '}
                  <div className="flex flex-col justify-center items-start space-y-2">
                    <label htmlFor="postalCode" className="text-start">
                      Code postal
                      <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="75001"
                      className="border px-4 py-2 rounded-lg w-full border-gray-300"
                      {...register('postalCode', {
                        required: true,
                        pattern: /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/,
                      })}
                    />
                    {errors.postalCode && (
                      <span className="text-error">
                        Le code postal est requis et doit être valide
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${stepIndex === 2 ? 'flex' : 'hidden'}`}
                >
                  <div className="flex flex-col justify-center items-start space-y-2">
                    <label htmlFor="city" className="text-start">
                      Ville
                      <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Paris"
                      className="border px-4 py-2 rounded-lg w-full border-gray-300"
                      {...register('city', {
                        required: true,
                      })}
                    />
                    {errors.city && <span className="text-error">La ville est requise</span>}
                  </div>{' '}
                  <div className="flex flex-col justify-center items-start space-y-2">
                    <label htmlFor="country" className="text-start">
                      Pays
                      <span className="text-error">*</span>
                    </label>
                    <input
                      placeholder="France"
                      type="text"
                      required
                      className="border px-4 py-2 rounded-lg w-full border-gray-300"
                      {...register('country', {
                        required: true,
                      })}
                    />
                    {errors.country && <span className="text-error">Le pays est requis</span>}
                  </div>
                </div>
                <button
                  type="submit"
                  className={`bg-primary rounded-lg w-full px-4 py-2 font-medium text-white hover:opacity-80 cursor-pointer transition-all shadow-sm ${stepIndex === 2 ? 'block' : 'hidden'}`}
                >
                  Inscription
                </button>
              </>
            </form>
          </div>
          <div>
            <p className="font-light">
              Vous avez déjà un compte ?{' '}
              <Link href="/connexion" className="font-medium hover:underline pb-10 md:pb-0">
                Connectez-vous
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
