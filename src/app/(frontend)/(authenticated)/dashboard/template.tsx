import { redirect } from 'next/navigation'
import Navbar from '../components/navbar'
import { getUser } from '../actions/get-user'

// Template is like layout, but keeps refreshing when things changes inside.
// so the user validation will be in every page inside it.
// Unlike layouts that persist across routes and maintain state,
// templates are given a unique key, meaning children Client Components reset their state on navigation.
export default async function Template(props: { children: React.ReactNode }) {
  const { children } = props

  const user = getUser()
  console.log({ user })
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
