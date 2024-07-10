import { FaTachometerAlt, FaShoppingCart, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import useRole from '../Hooks/useRole';

const Sidebar = () => {
	const [role, isLoading] = useRole()
	if(isLoading) return <div>Loading ....</div>
	return (
		<div className="bg-gray-100 text-gray-900 min-h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
			<h1 className='text-2xl font-bold hidden md:block mt-4 text-center italic'>Task Management</h1>
			<ul className='flex flex-col mt-5 text-xl'>
				<NavLink
					to="/main"
					end
					className={({ isActive }) =>
						`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white ${isActive ? 'bg-blue-600 text-white' : ''}`
					}
				>
					<FaTachometerAlt />
					<span className='hidden md:inline'>Profile</span>
				</NavLink>
				{role === "admin" && <NavLink
					to="/main/add-tasks"
					className={({ isActive }) =>
						`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white ${isActive ? 'bg-blue-600 text-white' : ''}`
					}
				>
					<FaTachometerAlt />
					<span className='hidden md:inline'>Add Tasks</span>
				</NavLink>}
				{role === "admin" && <NavLink
					to="/main/manage-tasks"
					className={({ isActive }) =>
						`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white ${isActive ? 'bg-blue-600 text-white' : ''}`
					}
				>
					<FaTachometerAlt />
					<span className='hidden md:inline'>Manage Tasks</span>
				</NavLink>}
				{role === "user" && <NavLink
					to="/main/my-tasks"
					className={({ isActive }) =>
						`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white ${isActive ? 'bg-blue-600 text-white' : ''}`
					}
				>
					<FaTachometerAlt />
					<span className='hidden md:inline'>My Tasks</span>
				</NavLink>}
				<NavLink
					to="/main/board"
					className={({ isActive }) =>
						`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer  hover:text-white hover:bg-blue-600 ${isActive ? 'bg-blue-600 text-white' : ''}`
					}
				>
					<FaShoppingCart />
					<span className="hidden md:inline ">Board</span>
				</NavLink>
				{ role === "admin" && <NavLink
					to="/main/users"
					className={({ isActive }) =>
						`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${isActive ? 'bg-blue-600 text-white' : ''}`
					}
				>
					<FaUser />
					<span className="hidden md:inline ">Users</span>
				</NavLink>}
			</ul>
		</div>
	);
};

export default Sidebar;
