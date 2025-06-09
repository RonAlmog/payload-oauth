'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import LoadingButton from '@/components/loading-button'
import { GithubIcon, MailIcon, KeyRound } from 'lucide-react'
import { InputPlus } from '@/components/button-plus'
import { signInSchema } from '@/lib/schemas'
import { toast } from 'sonner'
import { appClient } from 'payload-auth-plugin/client'
import { onGoogleAppSignin } from '@/lib/auth'
import { loginUser } from '../actions/login'

const LoginClient = () => {
  const { signin } = appClient({ name: 'app' })
  const [pending, setPending] = useState(false)
  const [pendingGitHub, setPendingGitHub] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const { email, password } = values
    // console.log({ values })

    // const { data, message, isSuccess, isError } = await signin().password({
    //   email: email,
    //   password: password,
    // })

    // console.log({ data, message, isSuccess, isError })

    // if (isError) {
    //   toast.error('Error', {
    //     description: message || 'Email or password do not match our records',
    //   })
    //   console.log(message)
    // }
    // if (isSuccess) {
    //   toast.success('Logged in!')
    //   router.push('/dashboard')
    // }

    const result = await loginUser({ email, password })
    console.log({ result })
    if (result.success) {
      toast.success('Logged in!')
      router.push('/dashboard')
    } else {
      toast.error('Error', {
        description: result.error || 'Email or password do not match our records',
      })
    }
  }

  const handleGoogleSignin = async () => {
    const { data, message, isSuccess, isError } = await onGoogleAppSignin()

    if (isError) {
      console.log(message)
    }
    if (isSuccess) {
      router.push('/dashboard')
      toast.success('Logged in with Google!')
    }
  }

  const handleGitHubSignIn = async () => {}

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome back! Please sign in to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <InputPlus placeholder="Your email" {...field} Icon={MailIcon} />
                  </FormControl>
                  <FormDescription>Please enter your email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPlus type="password" placeholder="***" {...field} Icon={KeyRound} />
                  </FormControl>
                  <FormDescription>Enter for your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton pending={pending}>Submit</LoadingButton>
          </form>
        </Form>
        <div className="mt-4">
          <LoadingButton pending={pendingGitHub} onClick={handleGoogleSignin}>
            <GithubIcon className=" size-4 mr-2" />
            Sign in with Google
          </LoadingButton>
        </div>
        <div className="mt-4">
          <LoadingButton pending={pendingGitHub} onClick={handleGitHubSignIn}>
            <GithubIcon className=" size-4 mr-2" />
            Sign in with GitHub
          </LoadingButton>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link className="text-primary hover:underline ml-1" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="mt-4 text-center text-sm">
          <Link href="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default LoginClient
