import React, { useContext, useMemo } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import FilterButtons from './FilterButtons';
import { AddButton } from '../common/Button';

const TaskList = ({ openAddTaskModal }) => {
  const { tasks, filter, loading, error } = useContext(TaskContext);

  const filteredTasks = useMemo(() => {
    if (!tasks.length) return [];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch (filter) {
      case 'All Tasks':
        return tasks;
      case 'Today':
        return tasks.filter(task => {
          if (!task.dueDate) return false;
          const dueDate = new Date(task.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === today.getTime();
        });
      case 'Upcoming':
        return tasks.filter(task => {
          if (!task.dueDate) return false;
          const dueDate = new Date(task.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate > today;
        });
      case 'Overdue':
        return tasks.filter(task => {
          if (!task.dueDate) return false;
          const dueDate = new Date(task.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate < today && !task.completed;
        });
      case 'High Priority':
        return tasks.filter(task => task.priority === 'HIGH');
      case 'Completed':
        return tasks.filter(task => task.completed);
      case 'Work':
      case 'Personal':
      case 'Health':
        return tasks.filter(task => task.category === filter);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{filter}</h1>
      
      <FilterButtons />
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Add a new task to get started!
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map(task => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}
      
      <AddButton onClick={openAddTaskModal} />
    </div>
  );
};

export default TaskList;
