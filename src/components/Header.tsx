import React from 'react';

// 定义组件props接口，
interface IProps {
  todoNum: number;
}

/**
 * * interface FunctionComponent<P = {}> {
 * *(props: PropsWithChildren<P>, context?: any): ReactElement | null;
 *  *    propTypes?: WeakValidationMap<P>;
 *  *    contextTypes?: ValidationMap<any>;
 *  *   defaultProps?: Partial<P>;
 *  *  displayName?: string;
 *  *}

 * * type PropsWithChildren<P> = P & { children?: ReactNode };
 * ? FC使用泛型约束了传入函数的props类型，默认为空对象，如果有props需要传入，必须定义接口指定类型，否者会提示错误，这样就约束了使用组件时就能很好地提示，避免传入错误的props
 *
 */
// const Header: React.FC = ({ todoNum }) => {
const Header: React.FC<IProps> = ({ todoNum }) => {
  return (
    <h2>
      You've got <span className='emphasis'>{todoNum}</span> things to do
    </h2>
  );
};

export default Header;
