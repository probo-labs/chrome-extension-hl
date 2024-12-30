// src/pages/Popup/Popup.jsx

import React from 'react';
import { ElementTag } from '../../services';
import '../../styles/tailwind.css';

const Popup = () => {
  const options = [
    ElementTag.INPUT_TEXT,
    ElementTag.BUTTON,
    ElementTag.LINK,
    ElementTag.INPUT_SELECT,
    ElementTag.INPUT_CHECKBOX,
    ElementTag.INPUT_RADIO,
    ElementTag.TEXTAREA,
    ElementTag.TOGGLE_SWITCH
  ];

  const handleHighlight = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const selectedValue = document.querySelector('select').value;
    
    chrome.tabs.sendMessage(tab.id, {
      action: 'highlight',
      elementType: selectedValue
    });
  };

  const handleUnhighlight = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.tabs.sendMessage(tab.id, {
      action: 'unhighlight'
    });
  };

  return (
    <div className="App">
      <select
        className="select select-bordered w-full"
        defaultValue={options[0]}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button className="btn btn-primary w-full" onClick={handleHighlight}>
        Highlight
      </button>
      <button className="btn btn-ghost w-full" onClick={handleUnhighlight}>
        Clear
      </button>
    </div>
  );
};

export default Popup;
