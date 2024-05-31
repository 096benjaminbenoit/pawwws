import { Field, Label, Input, Fieldset, Button } from '@headlessui/react'
import { Head, router } from '@inertiajs/react'
import { useState } from 'react'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

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
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('/api/register', data)
      router.visit('/tableau-de-bord')
      toast.success('Votre compte a bien été créé !')

      console.log(response)
    } catch (error) {
      toast.error("Votre compte n'a pas pu être créé")
      console.log(error.message)
    }
  }

  return (
    <>
      <Head title="Inscription" />
      <main className="lg:h-screen lg:flex">
        <span
          className={`h-full w-full hidden lg:block bg-cover bg-center bg-[url(public/img/registration_page_image.jpg)]`}
        ></span>
        <div className="flex flex-col my-10 lg:my-0 space-y-10 h-full w-full sm:p-16 md:p-24 lg:p-16">
          <h1 className="text-3xl text-center font-semibold text-primary">PAWWWS.</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl text-center font-medium">Inscription</h2>
            <div className="flex flex-col justify-center mx-4 space-y-1 py-4">
              <p className="text-gray-500">Étape {step} sur 2</p>
              <div className="h-2 rounded-full w-full bg-gray-200">
                <span
                  className={`block bg-primary h-2 ${step === 1 ? 'w-1/2' : 'w-full'} rounded-full transition-all ease-in-out duration-300`}
                ></span>
              </div>
            </div>

            {step === 1 ? (
              <div className="flex flex-col space-y-6">
                <p className="text-center text-lg">Informations pour vous connecter</p>
                <Field className="flex flex-col mx-4 space-y-1">
                  <Label className="font-semibold text-lg" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    type="email"
                    className="border border-gray-300 rounded-lg p-3"
                    {...register('email', {
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      onChange: (e) => setEmail(e.target.value),
                    })}
                  />
                  {errors.email && (
                    <span className="text-error">L'email est requis et doit être valide</span>
                  )}
                </Field>
                <Field className="flex flex-col mx-4 space-y-1">
                  <Label className="font-semibold text-lg" htmlFor="password">
                    Mot de passe
                  </Label>
                  <Input
                    type="password"
                    className="border border-gray-300 rounded-lg p-3"
                    {...register('password', {
                      required: true,
                      minLength: 8,
                      onChange: (e) => setPassword(e.target.value),
                    })}
                  />
                  {errors.password && (
                    <span className="text-error">
                      Le mot de passe est requis et doit contenur minimum 8 caractères
                    </span>
                  )}
                </Field>
                <Button
                  disabled={!email || password.length < 8}
                  onClick={() => setStep(2)}
                  className="text-center bg-primary text-white text-xl p-3 mx-4 rounded-lg font-semibold hover:bg-opacity-75 transition ease-in-out disabled:bg-gray-300"
                  type="button"
                >
                  Continuer
                </Button>
                <p className="text-center text-lg">
                  Vous avez déjà un compte ?{' '}
                  <a href="/connexion" className="underline hover:font-medium">
                    Connectez-vous
                  </a>
                </p>
              </div>
            ) : (
              <Fieldset className="flex flex-col space-y-6">
                <p className="text-center text-lg">
                  Informations sur votre association ou structure
                </p>
                <Field className="flex flex-col mx-4 space-y-1">
                  <a
                    className="underline hover:font-medium flex gap-2 items-center cursor-pointer"
                    onClick={() => setStep(1)}
                  >
                    <ArrowUturnLeftIcon className="w-4" />
                    Revenir à l'étape précédente
                  </a>
                  <Label className="font-semibold text-lg" htmlFor="name">
                    Nom
                  </Label>
                  <Input
                    className="border border-gray-300 rounded-lg p-3"
                    {...register('name', {
                      required: true,
                    })}
                  />
                  {errors.name && <span className="text-error">Le nom est requis</span>}
                </Field>
                <Field className="flex flex-col mx-4 space-y-1">
                  <Label className="font-semibold text-lg" htmlFor="telephone">
                    Téléphone
                  </Label>
                  <Input
                    className="border border-gray-300 rounded-lg p-3"
                    type="tel"
                    {...register('telephone', {
                      required: true,
                      pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                    })}
                  />
                  {errors.telephone && (
                    <span className="text-error">
                      Le numéro de téléphone est requis et doit être valide
                    </span>
                  )}
                </Field>
                <div className="flex flex-col justify-between items-center lg:flex-row mx-4 space-y-6 lg:space-y-0">
                  <Field className="flex flex-col space-y-1 w-full">
                    <Label className="font-semibold text-lg" htmlFor="address">
                      Adresse
                    </Label>
                    <Input
                      className="border border-gray-300 rounded-lg p-3"
                      {...register('address', {
                        required: true,
                      })}
                    />
                    {errors.address && <span className="text-error">L'adresse est requise</span>}
                  </Field>
                  <Field className="flex flex-col mx-4 space-y-1 w-full">
                    <Label className="font-semibold text-lg" htmlFor="postalCode">
                      Code postal
                    </Label>
                    <Input
                      className="border border-gray-300 rounded-lg p-3"
                      {...register('postalCode', {
                        required: true,
                      })}
                    />
                    {errors.postalCode && (
                      <span className="text-error">
                        Le code postal est requis et doit être valide
                      </span>
                    )}
                  </Field>
                </div>
                <div className="flex flex-col justify-between items-center lg:flex-row mx-4 space-y-6 lg:space-y-0">
                  <Field className="flex flex-col space-y-1 w-full">
                    <Label className="font-semibold text-lg" htmlFor="city">
                      Ville
                    </Label>
                    <Input
                      className="border border-gray-300 rounded-lg p-3"
                      {...register('city', {
                        required: true,
                      })}
                    />
                    {errors.city && <span className="text-error">La ville est requise</span>}
                  </Field>
                  <Field className="flex flex-col mx-4 space-y-1 w-full">
                    <Label className="font-semibold text-lg" htmlFor="country">
                      Pays
                    </Label>
                    <Input
                      className="border border-gray-300 rounded-lg p-3"
                      {...register('country', {
                        required: true,
                      })}
                    />
                    {errors.country && <span className="text-error">Le pays est requis</span>}
                  </Field>
                </div>
                <Button
                  className="text-center bg-primary text-white text-xl p-3 mx-4 rounded-lg font-semibold hover:bg-opacity-75 transition ease-in-out"
                  type="submit"
                >
                  Inscription
                </Button>
              </Fieldset>
            )}
          </form>
        </div>
      </main>
    </>
  )
}
