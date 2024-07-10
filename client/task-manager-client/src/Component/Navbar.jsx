import useAuth from '../Hooks/useAuth'

const Navbar = () => {
  const { logOut } = useAuth()
  
  return (
    <div className='bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-white'>
      <h1>Dashboard</h1>
      <button onClick={logOut} className='text-2xl'>Logout</button>
    </div>
  )
}

export default Navbar