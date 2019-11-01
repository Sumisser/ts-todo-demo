import React, { useState } from 'react';
import uuid from 'uuid/v1';
import { List } from '../interfaces';

interface IProps {
  handleAdd: (todo: List) => void;
}

const AddTodo: React.FC<IProps> = ({ handleAdd }) => {
  const [todo, setTodo] = useState('');
  const changeTodo: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = e => {
    const todo: string = e.currentTarget.value;
    setTodo(todo);
  };

  const addTodo: (event: React.FormEvent<HTMLFormElement>) => void = e => {
    e.preventDefault();
    /**
     * ! 这里犯了一个错误，直接将todo的内容字符串传给了父组件，实际需要的应该是List类型
     * ! 但这个错误在父组件接收的时候被ts立刻检查出来，这就避免了在编译的时候去排查，比较典型地体现了typescript的优势
     */
    // //handleAdd(todo);

    /**
     * *使用uuid这个包生成唯一id，在安装后在ts文件中无法识别，这是因为这个包是不兼容ts的，简单的方式是添加类型声明文件
     * *这个工作通常社区已经帮我们完成，只需要将安装的包改成 @types/xxx
     */
    const todoItem: List = {
      completed: false,
      text: todo,
      id: uuid()
    };
    todo && handleAdd(todoItem);
    setTodo('');
  };
  return (
    <form onSubmit={addTodo}>
      <input
        className='add-input'
        placeholder='I need to...'
        type='text'
        value={todo}
        onChange={changeTodo}
      />
      <button className='add-btn'>
        <h2>Add</h2>
      </button>
    </form>
  );
};

export default AddTodo;
