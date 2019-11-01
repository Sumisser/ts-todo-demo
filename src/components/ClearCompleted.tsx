import React from 'react';
interface IProps {
  clearCompletedTodos: () => void;
}
const ClearCompleted: React.FC<IProps> = ({ clearCompletedTodos }) => {
  return (
    <button className='clear-btn' onClick={clearCompletedTodos}>
      Clear completed
    </button>
  );
};
export default ClearCompleted;
