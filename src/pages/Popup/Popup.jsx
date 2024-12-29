import React from 'react';
import './Popup.css';

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

  const highlight = (elementType) => {
    console.log('Highlight function running in webpage context');
    console.log('Looking for elements of type:', elementType);

    const highlightInputText = () => {
      console.log('Highlighting input text');
      document.querySelectorAll('input[type="text"], textarea, input[type="password"]').forEach(input => {
        input.style.border = '2px solid red';
      });
    };

    if (elementType === 'input-text') {
      highlightInputText();
    }
  };

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
