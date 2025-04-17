import React, { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import Checkbox from '../common/Checkbox';

const TaskItem = ({ task }) => {
  const { toggleTaskCompleted, removeTask, editTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const handleToggleComplete = () => {
    toggleTaskCompleted(task._id, !task.completed);
  };

  const handleDelete = () => {
    removeTask(task._id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(task._id, {
      title: editedTitle,
      description: editedDescription
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setIsEditing(false);
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'HIGH':
        return 'border-red-500';
      case 'MEDIUM':
        return 'border-yellow-500';
      case 'LOW':
        return 'border-green-500';
      default:
        return 'border-gray-300';
    }
  };

  const getPriorityLabel = () => {
    return task.priority === 'HIGH' ? 'HIGH' : 'MEDIUM';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const dateNum = date.getDate();
    return `${day} ${month} ${dateNum}`;
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    return dueDate < today && !task.completed;
  };

  return (
    <div className={`border-l-4 ${getPriorityColor()} bg-white p-4 mb-2 rounded shadow-sm`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded"
            value={editedDescription}
            placeholder="Description"
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start">
          <Checkbox checked={task.completed} onChange={handleToggleComplete} className="mt-1" />
          <div className="ml-3 flex-grow">
            <div className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </div>
            {task.description && (
              <div className="text-sm text-gray-600 mt-1">{task.description}</div>
            )}
            <div className="flex mt-2 text-xs items-center">
              <span className={`mr-2 font-medium ${task.priority === 'HIGH' ? 'text-red-500' : 'text-yellow-500'}`}>
                {getPriorityLabel()}
              </span>
              <span className="mr-2 text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{task.category}</span>
              {task.dueDate && (
                <span className={`px-2 py-0.5 rounded ${isOverdue(task.dueDate) ? 'bg-red-100 text-red-500' : 'text-gray-500'}`}>
                  {isOverdue(task.dueDate) ? 'OVERDUE: ' : ''}{formatDate(task.dueDate)}
                </span>
              )}
              {task.recurring && (
                <span className="ml-2 text-purple-500 bg-purple-100 px-2 py-0.5 rounded">
                  {task.recurring}
                </span>
              )}
            </div>
          </div>
          <div className="flex ml-2">
            <button
              className="text-gray-400 hover:text-gray-600 p-1"
              onClick={handleEdit}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </button>
            <button
              className="text-gray-400 hover:text-gray-600 p-1"
              onClick={handleDelete}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
