import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Profile = () => {
    const { user, loader} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: userData = [], isLoading} = useQuery({
        queryKey: ["user"],
        queryFn: async() => {
            const {data} = await axiosSecure(`/user/${user?.email}`)
            return data
        }
    })
    if(loader || isLoading) return <div>Loading ..........</div>
    return (
        <div className="p-6 max-w-sm mx-auto flex items-center justify-center bg-gray-300 rounded-xl shadow-md h-[25vh]">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Email: {userData?.email}</h2>
                <p className="text-gray-500">User Role: {userData?.role}</p>
            </div>
        </div>
    );
};

export default Profile;