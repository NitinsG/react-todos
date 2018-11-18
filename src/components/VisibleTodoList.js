import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos } from '../reducers';

const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(state, ownProps.match.params.filter || 'all'),
  };
};


const VisibleTodoList = withRouter(connect(
  mapStateToProps,
   { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;
