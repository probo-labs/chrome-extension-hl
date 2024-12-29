import React from 'react';
import './Popup.css';

const Popup = () => {
  const options = ['Option 1', 'Option 2', 'Option 3']; // We can modify these later

  const handleHighlight = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Inject and execute content script
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (selectedOption) => {
        console.log('Highlight button clicked!');
        console.log('Selected option:', selectedOption);
      },
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
