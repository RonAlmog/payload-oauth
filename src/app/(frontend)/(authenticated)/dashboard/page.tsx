import { getUser } from '../actions/get-user'

const HomePage = async () => {
  const user = await getUser()
  console.log({ user })
  return <div>page</div>
}

export default HomePage
