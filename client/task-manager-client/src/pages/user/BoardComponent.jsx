import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from '../../Component/Board/Column';
import TaskCard from '../../Component/Board/TaskCard';
import useAuth from '../../Hooks/useAuth';

const BoardComponent = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const { data: myTasks = [], isLoading, refetch } = useQuery({
    queryKey: ['myTasks', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-tasks/${user?.email}`);
      return data;
    }
  });

  const [boardData, setBoardData] = useState({ 
    toDo: [], 
    inProgress: [], 
    finished: [] 
  });

  useEffect(() => {
    const newBoardData = {
      toDo: [],
      inProgress: [],
      finished: [],
    };

    myTasks.forEach((task) => {
      if (task.status === 'assigned') {
        newBoardData.toDo.push(task);
      } else if (task.status === 'in_progress') {
        newBoardData.inProgress.push(task);
      } else if (task.status === 'finished') {
        newBoardData.finished.push(task);
      }
    });

    // Only update the state if the new data is different from the current state
    if (JSON.stringify(newBoardData) !== JSON.stringify(boardData)) {
      setBoardData(newBoardData);
    }
  }, [myTasks, boardData]);

  const handleTaskStatusChange = useCallback(async (taskId, status) => {
    try {
      const { data } = await axiosSecure.patch(`/update-task/${taskId}`, { status });
      if (data.modifiedCount) {
        Swal.fire({
          title: 'Success!',
          text: `Task marked as ${status.replace('_', ' ')}.`,
          icon: 'success',
        });
        refetch();
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [axiosSecure, refetch]);
  if(isLoading) return <div>Loading ....</div>
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board flex justify-around">
        <Column status="assigned" onDrop={handleTaskStatusChange}>
          {boardData.toDo.map((task) => (
            <TaskCard key={task._id} task={task} onDrop={handleTaskStatusChange} />
          ))}
        </Column>
        <Column status="in_progress" onDrop={handleTaskStatusChange}>
          {boardData.inProgress.map((task) => (
            <TaskCard key={task._id} task={task} onDrop={handleTaskStatusChange} />
          ))}
        </Column>
        <Column status="finished" onDrop={handleTaskStatusChange}>
          {boardData.finished.map((task) => (
            <TaskCard key={task._id} task={task} onDrop={handleTaskStatusChange} />
          ))}
        </Column>
      </div>
    </DndProvider>
  );
};

export default BoardComponent;
