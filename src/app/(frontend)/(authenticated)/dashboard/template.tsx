import { redirect } from 'next/navigation'
import { getUser } from './actions/get-user'
import Navbar from './components/navbar'

// Template is like layout, but keeps refreshing when things changes inside.
// so the user validation will be in every page inside it.
// Unlike layouts that persist across routes and maintain state,
// templates are given a unique key, meaning children Client Components reset their state on navigation.
export default async function Template(props: { children: React.ReactNode }) {
  const { children } = props

  const user = getUser()
  if (!user) {
    redirect('/login')
    return null
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
