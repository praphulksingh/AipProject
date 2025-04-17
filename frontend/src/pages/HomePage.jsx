import React, { useState } from 'react';
import { TaskProvider } from '.././context/TaskContext';
import Sidebar from '.././components/layout/Sidebar';
import Header from '.././components/layout/Header';
import TaskList from '.././components/tasks/TaskList';
import Modal from '.././components/common/Modal';
import TaskForm from '.././components/tasks/TaskForm';


const Homepage = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openAddTaskModal = () => {
    setEditingTask(null);
    setIsAddTaskModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setEditingTask(task);
    setIsAddTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsAddTaskModalOpen(false);
    setEditingTask(null);
  };

  return (
    <TaskProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <TaskList 
              openAddTaskModal={openAddTaskModal} 
              openEditTaskModal={openEditTaskModal} 
            />
          </main>
        </div>

        {/* Add/Edit Task Modal */}
        <Modal 
          isOpen={isAddTaskModalOpen} 
          onClose={closeTaskModal}
          title={editingTask ? "Edit Task" : "Add New Task"}
        >
          <TaskForm 
            onClose={closeTaskModal} 
            editTask={editingTask} 
          />
        </Modal>
      </div>
    </TaskProvider>
  );
};

export default Homepage;
