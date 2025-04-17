import React from 'react';

const Checkbox = ({ checked, onChange, className = '' }) => {
  // Determine border color based on checked state
  const borderColor = checked ? 'border-blue-500' : 'border-gray-300';
  
  return (
    <div 
      className={`w-5 h-5 border rounded-sm cursor-pointer flex items-center justify-center transition-colors
        ${checked ? 'bg-blue-500' : 'bg-white'} ${borderColor} ${className}`}
      onClick={onChange}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      )}
    </div>
  );
};

export default Checkbox;
