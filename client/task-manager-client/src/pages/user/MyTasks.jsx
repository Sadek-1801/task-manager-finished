import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import 'daisyui/dist/full.css';

const MyTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myTasks = [], isLoading, refetch } = useQuery({
    queryKey: ['myTasks', user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-tasks/${user.email}`);
      return data;
    }
  });

  const { mutateAsync } = useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.patch(`/update-task-status/${id}`, { status: 'finished' });
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Good job!',
        text: 'You have marked the task as finished!',
        icon: 'success'
      });
      refetch();
    }
  })
  const handleFinishTask = (taskId) => {
    mutateAsync(taskId);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      <table className="table w-full mb-6">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myTasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.tasks}</td>
              <td>
                <button
                  disabled={task.status === "finished"}
                  onClick={() => handleFinishTask(task._id)}
                  className="btn btn-sm btn-success mr-2"
                >
                  Check
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTasks;
