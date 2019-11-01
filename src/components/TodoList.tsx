import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List } from '../interfaces';

interface IProps {
  list: List[];
  getUncompletedNumber: (num: number) => void;
  getDefaultTodos: (todos: List[]) => void;
}

interface ResponseData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
const TodoList: React.FC<IProps> = ({
  getUncompletedNumber,
  getDefaultTodos,
  list = []
}) => {
  /**
   * * function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
   * ! 传入空数组作为默认todos，需要在调用useState时显示传入泛型的具体类型
   * ? todos的数据应该是List[]类型，如果不指定类型，ts会将传入的类型推断为never[],setTodos传入的类型就无法分配给never[]
   * ? 如果指定了泛型类型为List[],传入空数组作为初始值，[]类型被认为是List[]的子类型，这样赋值ts是允许的
   */
  const [todos, setTodos] = useState<List[]>([]);
  useEffect(() => {
    const getTodos: () => void = async () => {
      /**
       * ? 根据返回的数据定义接口ResponseData，在使用返回数据时能提供很好的代码提示
       * todo 如果后端返回数据字段改变了，只需要修改定义接口中相应的字段，在使用到接口中定义的数据都会有错误提示，可以快速修改
       */
      const { data } = await axios.get<ResponseData[]>(
        'https://jsonplaceholder.typicode.com/todos'
      );
      const todos: List[] = data.slice(0, 3).map(li => {
        return {
          /**
           * * 这里有一个返回数据中不存在的字段uuid,由于定义了ResponseData，ts会有错误提示
           */
          // userId: li.uuid,
          id: li.id,
          text: li.title,
          completed: li.completed
        };
      });
      setTodos(todos);
      getDefaultTodos(todos);
      getUncompletedNumber(changeUncompletedTodosNum(todos));
    };
    getTodos();
  }, []);

  useEffect(() => {
    setTodos(list);
  }, [list]);
  /**
   * * 编辑器在onClick事件上会有传入函数的类型定义，按此定义参数和返回值类型，可以获得更多的字段提示
   */
  const completeTodo: (
    event: React.MouseEvent<HTMLSpanElement>
  ) => void = e => {
    const newTodos: List[] = todos.map(todo => {
      let isCurrentTodo = e.currentTarget.id === todo.id.toString();
      return isCurrentTodo
        ? {
            ...todo,
            completed: !todo.completed
          }
        : todo;
    });

    setTodos(newTodos);
    getDefaultTodos(newTodos);
    getUncompletedNumber(changeUncompletedTodosNum(newTodos));
  };
  const changeUncompletedTodosNum: (todos: List[] | []) => number = todos => {
    return todos.filter(todo => !todo.completed).length;
  };
  return (
    <ul>
      {todos.map(todo => {
        return (
          <li key={todo.id} id={todo.id.toString()} onClick={completeTodo}>
            <span className={`done-${todo.completed}`}>{todo.text}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
