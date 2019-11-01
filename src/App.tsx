import React, { useState } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import './App.css';

const App: React.FC = () => {
  const [num, setNum] = useState(0);
  return (
    /**
     * ? react.FC类型约束了jsx中的属性，如错写className为class并不存在，编译时检测到错误
     */
    <div className='todo-wrapper'>
      <Header todoNum={num} />
      <TodoList />
      <form>
        <input
          className='add-input'
          placeholder='I need to...'
          type='text'
          ng-model='formTodoText'
          ng-model-instant
        />
        <button className='add-btn'>
          <h2>Add</h2>
        </button>
      </form>
      <button className='clear-btn' ng-click='clearCompleted()'>
        Clear completed
      </button>
    </div>
  );
};

export default App;
