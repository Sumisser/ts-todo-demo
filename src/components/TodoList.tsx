import React from 'react';

interface IProps {
  list?: List[];
}

interface List {
  completed: boolean;
  text: string;
}

const TodoList: React.FC<IProps> = ({ list }) => {
  return (
    <ul>
      <li>
        <input type='checkbox' ng-model='todo.done' />
        <span className='done-{{todo.done}}'>1111</span>
      </li>
    </ul>
  );
};

export default TodoList;
