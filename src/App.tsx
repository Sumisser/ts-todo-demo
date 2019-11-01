import React from 'react';
import Header from './components/Header';
import './App.css';

const App: React.FC = () => {
  return (
    /**
     * ? react.FC类型约束了jsx中的属性，如错写className为class并不存在，编译时检测到错误
     */
    <div className='todo-wrapper'>
      <Header todoNum={0} />
      <ul>
        <li>
          <input type='checkbox' ng-model='todo.done' />
          <span className='done-{{todo.done}}'>1111</span>
        </li>
      </ul>
      <form>
        <input
          className='add-input'
          placeholder='I need to...'
          type='text'
          ng-model='formTodoText'
          ng-model-instant
        />
        <button className='add-btn' ng-click='addTodo()'>
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
