import { useDrop } from "react-dnd";
import PropTypes from "prop-types"

const ItemTypes = {
  TASK: 'task',
};

const Column = ({ status, children, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
      accept: ItemTypes.TASK,
      drop: (item) => onDrop(item.id, status),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });
  
    return (
      <div ref={drop} className={`column p-4 bg-gray-100 rounded shadow w-1/3 mx-2 ${isOver ? 'bg-gray-200' : ''}`}>
        <h2 className="font-bold text-xl mb-4 uppercase text-center bg-gray-300">{status.replace('_', ' ')}</h2>
        {children}
      </div>
    );
  };
  Column.propTypes = {
    status: PropTypes.string,
    children: PropTypes.node,
    onDrop: PropTypes.func
  }
  export default Column;