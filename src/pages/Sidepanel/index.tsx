import React from 'react';
import { createRoot } from 'react-dom/client';
import Sidepanel from './Sidepanel';
import './index.css';

console.log('Starting Sidepanel initialization');  // Debug log

const init = () => {
  console.log('Init function called');  // Debug log
  
  const container = document.getElementById('app-container');
  console.log('Container:', container);  // Debug log
  
  if (!container) {
    console.error('Container not found!');  // Debug log
    return;
  }

  try {
    const root = createRoot(container);
    console.log('Root created');  // Debug log
    
    root.render(
      <React.StrictMode>
        <Sidepanel />
      </React.StrictMode>
    );
    console.log('Render called');  // Debug log
  } catch (error) {
    console.error('Error during render:', error);  // Debug log
  }
};

init(); 