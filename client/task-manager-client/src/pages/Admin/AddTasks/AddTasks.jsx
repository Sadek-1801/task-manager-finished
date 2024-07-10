import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
const AddTasks = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loader } = useAuth()
    const [formData, setFormData] = useState({
        title: '',
        tasks: '',
        assignedTo: [],
        deadline: ''
    });
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure("/users")
            const usersEmail = data.map(userEmail => userEmail.email)
            return usersEmail
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setFormData({ ...formData, assignedTo: [...formData.assignedTo, name] });
        } else {
            setFormData({ ...formData, assignedTo: formData.assignedTo.filter(user => user !== name) });
        }
    };
    const handleDateChange = (date) => {
        setFormData({ ...formData, deadline: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const taskData = {
            ...formData,
            assignedBy: user?.email,
            status: "assigned"
        }
        try {
            const { data } = await axiosSecure.post("/add-task", taskData)
            console.log(data);
            if (data.insertedId) {
                Swal.fire({
                    title: "Good job!",
                    text: "You have Added Job Successfully!",
                    icon: "success"
                });
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    if (isLoading || loader) return <span className="loading loading-ring loading-lg"></span>
    return (
        <section className="flex items-center justify-center">
            <div className="w-full max-w-lg">
                <h1 className="text-center text-2xl">Assign Tasks</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData?.title}
                            onChange={handleChange}
                            placeholder="e.g., Task Title"
                            className="w-full p-2 border border-blue-600 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Assign To</label>
                        <div className="flex flex-wrap">
                            <ul>{users?.map((user, idx) => (
                                <li key={idx}><label className="block mr-4">
                                    <input
                                        type="checkbox"
                                        name={user}
                                        checked={formData?.assignedTo?.includes(user)}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    {user}
                                </label>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block">Task Description</label>
                        <textarea
                            name="tasks"
                            value={formData?.tasks}
                            required
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-2 rounded border border-blue-600"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block">Deadline</label>
                        <DatePicker
                            selected={formData?.deadline}
                            onChange={handleDateChange}
                            className="w-full p-2 border border-blue-600 rounded"
                        />
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-4">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default AddTasks;
