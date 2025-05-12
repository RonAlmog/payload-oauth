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
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { InputPlus } from '@/components/button-plus'
import { signUpSchema } from '@/lib/schemas'
import { appClient } from 'payload-auth-plugin/client'
import { handleAppUserSignup, onGoogleAppSignin } from '@/lib/auth'
import { redirect, useRouter } from 'next/navigation'
import { GithubIcon, KeyRound, MailIcon, UserIcon } from 'lucide-react'
import { toast } from 'sonner'

import config from '@payload-config'
import { getPayload } from 'payload'
import { cookies as getCookies } from 'next/headers'
import { signupUser } from '../actions/signup'
import LoadingButton from '@/components/loading-button'

const SignUpClient = () => {
  const { signup } = appClient({ name: 'app' })
  const router = useRouter()
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      // name: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    // const res = await signupUser(values)
    // if (res.error) {
    //   toast.error('Error', {
    //     description: res.error || 'Could not sign up',
    //   })
    // }
    // if (res.success) {
    //   toast.success('Signed up!')
    //   router.push('/dashboard')
    // }

    const { data, message, isSuccess, isError } = await handleAppUserSignup(values)
    console.log({ data, message, isSuccess, isError })
    if (isError) {
      toast.error('Error', {
        description: message || 'Could not sign up',
      })
      console.log(message)
    }
    if (isSuccess) {
      toast.success('Signed up!')
      router.push('/dashboard')
    }
  }

  const handleGoogleSignin = async () => {
    const { data, message, isSuccess, isError } = await onGoogleAppSignin()

    if (isError) {
      console.log(message)
    }
    if (isSuccess) {
      router.push('/admin')
    }
  }

  const handleGitHubSignIn = async () => {}

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <InputPlus placeholder="John doe" {...field} Icon={UserIcon} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <InputPlus placeholder="Email" {...field} Icon={MailIcon} />
                  </FormControl>
                  <FormDescription>Enter your email address</FormDescription>
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
                    <InputPlus type="password" placeholder="Password" {...field} Icon={KeyRound} />
                  </FormControl>
                  <FormDescription>Choose a password for your account</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </form>
        </Form>
        <div className="mt-4">
          <LoadingButton pending={false} onClick={handleGoogleSignin}>
            <GithubIcon className=" size-4 mr-2" />
            Sign up with Google
          </LoadingButton>
        </div>
        <div className="mt-4">
          <LoadingButton pending={false} onClick={handleGitHubSignIn}>
            <GithubIcon className=" size-4 mr-2" />
            Sign up with GitHub
          </LoadingButton>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link className="text-primary hover:underline ml-1" href="/sign-in">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default SignUpClient
