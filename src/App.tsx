import React, { useState } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import ClearCompleted from './components/ClearCompleted';

import { List } from './interfaces';
import './App.css';

const App: React.FC = () => {
  const [uncompletedTodosNum, setUncompletedTodosNum] = useState<number>(0);
  const [todos, setTodos] = useState<List[]>([]);
  const clear = () => {
    const uncompletedTodos = todos.filter(todo => !todo.completed);

    setTodos(uncompletedTodos);
  };
  return (
    /**
     * ? react.FC类型约束了jsx中的属性，如错写className为class并不存在，编译时检测到错误
     */
    <div className='todo-wrapper'>
      <Header todoNum={uncompletedTodosNum} />
      <TodoList
        getDefaultTodos={todos => {
          setTodos(todos);
        }}
        getUncompletedNumber={num => {
          setUncompletedTodosNum(num);
        }}
        list={todos}
      />

      <AddTodo handleAdd={todo => setTodos([...todos, todo])} />
      <ClearCompleted clearCompletedTodos={clear} />
    </div>
  );
};

export default App;
