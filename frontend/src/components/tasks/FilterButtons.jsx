import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const FilterButtons = () => {
  const { filter, setFilter } = useContext(TaskContext);

  const filters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'today', label: 'Today' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'overdue', label: 'Overdue' }
  ];

  const priorityFilters = [
    { id: 'high-priority', label: 'High Priority' },
    { id: 'completed', label: 'Completed' }
  ];

  const projectFilters = [
    { id: 'work', label: 'Work', color: 'blue' },
    { id: 'personal', label: 'Personal', color: 'green' },
    { id: 'health', label: 'Health', color: 'red' }
  ];

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((filterOption) => (
          <button
            key={filterOption.id}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === filterOption.label
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setFilter(filterOption.label)}
          >
            {filterOption.label}
          </button>
        ))}
      </div>
      
      <div className="mt-2 flex flex-wrap gap-2">
        {projectFilters.map((project) => (
          <button
            key={project.id}
            className={`px-3 py-1 text-sm rounded-md flex items-center ${
              filter === project.label
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setFilter(project.label)}
          >
            <span className={`w-2 h-2 rounded-full bg-${project.color}-500 mr-1.5`}></span>
            {project.label}
          </button>
        ))}
        
        {priorityFilters.map((priorityFilter) => (
          <button
            key={priorityFilter.id}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === priorityFilter.label
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setFilter(priorityFilter.label)}
          >
            {priorityFilter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
