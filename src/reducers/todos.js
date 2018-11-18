import { combineReducers } from 'redux';
import todo from './todo';

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
         ...state,
         [action.id]: todo(state[action.id], action),    
      };
    default:
      return state;
  }
};


const allIds = (state = [], action) => {
  switch (action.type) {
   case 'ADD_TODO':
      return [...state, action.id];
   default:
      return state;
  }
}; 

const todos = combineReducers({ byId, allIds });

export default todos;

const getAllTodos = (state) => state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
   const getTodos = getAllTodos(state);
   switch (filter) {
    case 'all':
      return getTodos;
    case 'completed':
      return getTodos.filter(t => t.completed);
    case 'active':
      return getTodos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
