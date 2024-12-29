import React from 'react';
import './Popup.css';
import { highlight } from '../../services/dom/highlight';

const Popup = () => {
  const options = [
    'input-text',
    'clickable',
    'select',
    'radio',
    'checkbox',
    'textarea',
    'datepicker'
  ];

  const handleHighlight = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: highlight,
      args: [document.querySelector('select').value]
    });
  };

  return (
    <div className="App">
      <select defaultValue={options[0]}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={handleHighlight}>Highlight</button>
    </div>
  );
};

export default Popup;
