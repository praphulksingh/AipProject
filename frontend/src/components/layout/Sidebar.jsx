import React, { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { InboxIcon, CalendarIcon, ClockIcon, ExclamationIcon, StarIcon, CheckCircleIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

const Sidebar = () => {
  const { setFilter, filter } = useContext(TaskContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filters = [
    { name: 'All Tasks', icon: InboxIcon },
    { name: 'Today', icon: CalendarIcon },
    { name: 'Upcoming', icon: ClockIcon },
    { name: 'Overdue', icon: ExclamationIcon }
  ];

  const projects = [
    { name: 'Work', color: 'blue' },
    { name: 'Personal', color: 'green' },
    { name: 'Health', color: 'red' }
  ];

  const otherFilters = [
    { name: 'High Priority', icon: StarIcon },
    { name: 'Completed', icon: CheckCircleIcon }
  ];

  const handleFilterClick = (filterName) => {
    setFilter(filterName);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-gray-800 text-white"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar for mobile (overlay) */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 md:hidden transition-opacity duration-300 ${
        isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={toggleSidebar}></div>

      {/* Sidebar content */}
      <div className={`fixed md:static h-screen bg-gray-800 text-white p-4 z-50 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'w-64 left-0' : '-left-64 w-64'} md:w-60 md:left-0`}>
        
        {/* Close button (mobile only) */}
        <div className="flex justify-between items-center mb-8 md:hidden">
          <div className="text-2xl font-bold">Tasketry</div>
          <button onClick={toggleSidebar} className="text-white">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Desktop logo */}
        <div className="hidden md:block text-2xl font-bold mb-8">Tasketry</div>
        
        <div className="mb-8">
          <div className="text-gray-400 text-sm mb-2">Date Filters</div>
          {filters.map(item => (
            <div 
              key={item.name}
              className={`flex items-center p-2 rounded-md cursor-pointer mb-1 ${
                filter === item.name ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleFilterClick(item.name)}
            >
              <item.icon className="h-5 w-5 text-gray-400 mr-2" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        
        <div className="mb-8">
          <div className="text-gray-400 text-sm mb-2">Projects</div>
          {projects.map(project => (
            <div 
              key={project.name}
              className={`flex items-center p-2 rounded-md cursor-pointer mb-1 ${
                filter === project.name ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleFilterClick(project.name)}
            >
              <span className={`w-3 h-3 rounded-full bg-${project.color}-500 mr-2`}></span>
              <span>{project.name}</span>
            </div>
          ))}
        </div>
        
        <div>
          <div className="text-gray-400 text-sm mb-2">Other Filters</div>
          {otherFilters.map(item => (
            <div 
              key={item.name}
              className={`flex items-center p-2 rounded-md cursor-pointer mb-1 ${
                filter === item.name ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleFilterClick(item.name)}
            >
              <item.icon className="h-5 w-5 text-gray-400 mr-2" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
