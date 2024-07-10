import { useState } from 'react';
import { Dialog, DialogTitle } from '@headlessui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import 'daisyui/dist/full.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';



const ManageTask = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allTasks = [], refetch, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-tasks");
      return data;
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', assignedTo: [], tasks: '', deadline: new Date() });
  const [currentTask, setCurrentTask] = useState(null);
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure("/users")
      const usersEmail = data.map(userEmail => userEmail.email)
      return usersEmail
    }
  })
  const handleOpenModal = (task) => {
    setCurrentTask(task);
    setFormData(task);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenStatusModal = (task) => {
    setCurrentTask(task);
    setIsStatusOpen(true);
  };

  const handleCloseStatusModal = () => {
    setIsStatusOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      assignedTo: checked
        ? [...prevFormData.assignedTo, name]
        : prevFormData.assignedTo.filter((user) => user !== name),
    }));
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id, ...taskData } = formData;
    taskData.status = "assigned"

    console.log(_id);
    try {
      const { data } = await axiosSecure.patch(`/update-task/${currentTask._id}`, taskData);
      if (data.modifiedCount) {
        Swal.fire({
          title: "Good job!",
          text: "You have Updated Task Successfully!",
          icon: "success"
        });
        refetch();
      }
    } catch (err) {
      console.log(err.message);
    }
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/delete/${id}`);
          if (data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Task has been deleted.",
              icon: "success"
            });
            refetch();
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    });
    
  };

  const handleStatusChange = async (status) => {
    try {
      const { data } = await axiosSecure.patch(`/update-task/${currentTask._id}`, { status });
      if (data.modifiedCount) {
        Swal.fire({
          title: "Success!",
          text: `Task Status updated as ${status.replace('_', ' ')}.`,
          icon: "success"
        });
        refetch();
      }
    } catch (err) {
      console.log(err.message);
    }
    handleCloseStatusModal();
  };
  if (isLoading) return <span className="loading loading-ring loading-lg"></span>
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center mx-auto">Manage Tasks</h2>
      <table className="table w-full mb-6">
        <thead>
          <tr className='font-bold text-xl bg-gray-200'>
            <th>Sl No</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allTasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>
                <button
                  onClick={() => handleOpenModal(task)}
                  className="btn btn-sm btn-primary mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-sm btn-error mr-2"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleOpenStatusModal(task)}
                  className="btn btn-sm btn-success"
                >
                  Change Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Task Modal */}
      <Dialog open={isOpen} onClose={handleCloseModal}>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white relative p-6 rounded-lg shadow-lg w-full max-w-md">
            <DialogTitle className="text-lg font-bold mb-4">Edit Task</DialogTitle>
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              X
            </button>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Task Title"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block">Assign To</label>
                <div className="flex flex-wrap">
                  <ul>
                    {users.map((user) => (
                      <li key={user}>
                        <label className="block mr-4">
                          <input
                            type="checkbox"
                            name={user}
                            checked={formData.assignedTo.includes(user)}
                            onChange={handleCheckboxChange}
                            className="checkbox checkbox-primary mr-2"
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
                  value={formData.tasks}
                  required
                  onChange={handleChange}
                  rows="4"
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block">Deadline</label>
                <DatePicker
                  selected={formData.deadline}
                  onChange={handleDateChange}
                  className="input input-bordered w-full"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Change Status Modal */}
      <Dialog open={isStatusOpen} onClose={handleCloseStatusModal}>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white relative p-6 rounded-lg shadow-lg w-full max-w-md">
            <DialogTitle className="text-lg font-bold mb-4">Change Task Status</DialogTitle>
            <button onClick={handleCloseStatusModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              X
            </button>
            <div className="space-y-4">
              <button
                onClick={() => handleStatusChange('assigned')}
                className="btn btn-warning w-full"
              >
                Assigned
              </button>
              <button
                onClick={() => handleStatusChange('in_progress')}
                className="btn btn-info w-full"
              >
                In Progress
              </button>
              <button
                onClick={() => handleStatusChange('finished')}
                className="btn btn-success w-full"
              >
                Finished
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageTask;
