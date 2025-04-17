import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import Button from '../common/Button';

const TaskForm = ({ onClose, editTask = null }) => {
  const { addTask, editTask: updateTask } = useContext(TaskContext);
  const [title, setTitle] = useState(editTask ? editTask.title : '');
  const [description, setDescription] = useState(editTask ? editTask.description || '' : '');
  const [priority, setPriority] = useState(editTask ? editTask.priority : 'MEDIUM');
  const [category, setCategory] = useState(editTask ? editTask.category : 'Personal');
  const [dueDate, setDueDate] = useState(editTask && editTask.dueDate ? new Date(editTask.dueDate).toISOString().split('T')[0] : '');
  const [isRecurring, setIsRecurring] = useState(editTask ? !!editTask.recurring : false);
  const [recurringPattern, setRecurringPattern] = useState(editTask ? editTask.recurring || 'Daily' : 'Daily');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const taskData = {
      title,
      description,
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate) : null,
      recurring: isRecurring ? recurringPattern : null
    };
    
    if (editTask) {
      updateTask(editTask._id, taskData);
    } else {
      addTask(taskData);
    }
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Task Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="What needs to be done?"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add details..."
          rows="2"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Health">Health</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="recurring"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700">
          Recurring Task
        </label>
      </div>
      
      {isRecurring && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Repeat
          </label>
          <select
            value={recurringPattern}
            onChange={(e) => setRecurringPattern(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
      )}
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button 
          variant="secondary" 
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          type="submit"
        >
          {editTask ? 'Update Task' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
