import { Outlet } from "react-router-dom";
import Navbar from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";

const Main = () => {


    return (
        <div className='flex'>
            <Sidebar />
            <div className='grow ml-16 md:ml-64 h-full lg:min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white'>
                <Navbar />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Main;