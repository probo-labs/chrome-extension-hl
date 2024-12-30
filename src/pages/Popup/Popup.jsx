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

  const handleHighlight = async (selectedValue) => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
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

  const handleSelectChange = async (event) => {
    await handleUnhighlight();
    if (event.target.value !== '') {  // Only highlight if not the default option
      await handleHighlight(event.target.value);
    }
  };

  return (
    <div className="App p-2 min-w-[180px]">
      <select
        className="select select-bordered select-sm w-full mb-2 text-sm"
        defaultValue=""
        onChange={handleSelectChange}
      >
        <option value="" disabled>-- please select --</option>
        {options.map((option) => (
          <option key={option} value={option} className="text-sm">
            {option}
          </option>
        ))}
      </select>
      <button className="btn btn-ghost btn-sm w-full text-sm" onClick={handleUnhighlight}>
        Clear
      </button>
    </div>
  );
};

export default Popup;
