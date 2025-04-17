// utils/dateUtils.js

/**
 * Format a date to display in the task list (e.g., "Wed, Mar 5")
 * @param {Date|string} date - Date object or date string
 * @returns {string} Formatted date string
 */
export const formatTaskDate = (date) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
    const dateNum = dateObj.getDate();
    
    return `${day}, ${month} ${dateNum}`;
  };
  
  /**
   * Check if a date is today
   * @param {Date|string} date - Date object or date string
   * @returns {boolean} True if the date is today
   */
  export const isToday = (date) => {
    if (!date) return false;
    
    const dateObj = new Date(date);
    const today = new Date();
    
    return dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear();
  };
  
  /**
   * Check if a date is in the future
   * @param {Date|string} date - Date object or date string
   * @returns {boolean} True if the date is in the future
   */
  export const isFuture = (date) => {
    if (!date) return false;
    
    const dateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return dateObj > today;
  };
  
  /**
   * Check if a date is overdue
   * @param {Date|string} date - Date object or date string
   * @returns {boolean} True if the date is overdue
   */
  export const isOverdue = (date) => {
    if (!date) return false;
    
    const dateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return dateObj < today;
  };
  
  /**
   * Get relative date description (Today, Tomorrow, etc.)
   * @param {Date|string} date - Date object or date string
   * @returns {string} Relative date description
   */
  export const getRelativeDateDescription = (date) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (isToday(dateObj)) return 'Today';
    
    if (dateObj.getDate() === tomorrow.getDate() &&
        dateObj.getMonth() === tomorrow.getMonth() &&
        dateObj.getFullYear() === tomorrow.getFullYear()) {
      return 'Tomorrow';
    }
    
    return formatTaskDate(date);
  };
  