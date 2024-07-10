import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure('/users');
            return data;
        },
    });

    const handleDeleteUser = async (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const { data } = await axiosSecure.delete(`/users/${userId}`);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'User has been deleted.',
                                icon: 'success',
                            });
                            refetch();
                        }
                    } catch (err) {
                        console.log(err.message);
                        Swal.fire({
                            title: 'Error!',
                            text: 'There was an error deleting the user.',
                            icon: 'error',
                        });
                    }
                }
            });

    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Users List</h2>
            <table className="table w-full mb-6">
                <thead>
                    <tr className='font-bold text-xl bg-gray-200'>
                        <th className="py-2 px-4">Sl No</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Role</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4">{index + 1}</td>
                            <td className="py-2 px-4">{user.email}</td>
                            <td className="py-2 px-4">{user.role}</td>
                            <td className="py-2 px-4">
                                <button
                                    disabled={user?.role === "admin"}
                                    onClick={() => handleDeleteUser(user._id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default Users;