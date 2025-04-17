import React, { createContext, useReducer, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api';

export const TaskContext = createContext();

const initialState = {
  tasks: [],
  filter: 'All Tasks',
  loading: false,
  error: null
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'FETCH_TASKS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_TASKS_SUCCESS':
      return { ...state, tasks: action.payload, loading: false };
    case 'FETCH_TASKS_FAILURE':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task._id === action.payload._id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const loadTasks = async () => {
      dispatch({ type: 'FETCH_TASKS_REQUEST' });
      try {
        const tasks = await fetchTasks();
        dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: tasks });
      } catch (error) {
        dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
      }
    };
    
    loadTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const newTask = await createTask(task);
      dispatch({ type: 'ADD_TASK', payload: newTask });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskCompleted = async (id, completed) => {
    try {
      const updatedTask = await updateTask(id, { completed });
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const editTask = async (id, taskData) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        filter: state.filter,
        loading: state.loading,
        error: state.error,
        addTask,
        toggleTaskCompleted,
        editTask,
        removeTask,
        setFilter
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
