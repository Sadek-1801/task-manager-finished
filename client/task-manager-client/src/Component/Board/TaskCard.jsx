import { useDrag } from "react-dnd";
import PropTypes from "prop-types"

const ItemTypes = {
    TASK: 'task',
  };
const TaskCard = ({ task, onDrop }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { id: task._id, status: task.status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            className={`task-card p-4 bg-white rounded shadow mb-2 cursor-move ${isDragging ? 'opacity-50' : ''}`}
        >
            <h3 className="font-bold capitalize">{task.title}</h3>
            <p className="">{task.tasks}</p>
            {task.status !== 'finished' && (
                <button
                    onClick={() => onDrop(task._id, 'finished')}
                    className="btn btn-outline btn-accent mt-2"
                >
                    Mark as Finished
                </button>
            )}
        </div>
    );
};
TaskCard.propTypes = {
    task: PropTypes.object,
    onDrop: PropTypes.func
}
export default TaskCard;