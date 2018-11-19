import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component {
  componentDidMount() {
    console.log("VisibleTodoList Component Did Mount");
    fetchTodos(this.props.filter).then(todos =>console.log(this.props.filter, todos) // eslint-disable-line no-console
    );
  }

   componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(this.props.filter, todos) // eslint-disable-line no-console
      );
    }
  }

  render() {
    return <TodoList {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};


VisibleTodoList = withRouter(connect(
  mapStateToProps,
   { onTodoClick: toggleTodo }
)(VisibleTodoList));

export default VisibleTodoList;
