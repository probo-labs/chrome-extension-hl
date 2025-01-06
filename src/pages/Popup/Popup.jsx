// src/pages/Popup/Popup.jsx

import React from 'react';
import { ElementTag } from 'probolabs-js';
import '../../styles/tailwind.css';

const Popup = () => {
  const [selectedOption, setSelectedOption] = React.useState(ElementTag.CLICKABLE);

  // Load the selected option on component mount
  React.useEffect(() => {
    chrome.storage.local.get("selectedOption", (data) => {
      if (data.selectedOption) {
        setSelectedOption(data.selectedOption);
      }
    });
  }, []);

  const options = [
    ElementTag.CLICKABLE,
    ElementTag.FILLABLE,
    ElementTag.SELECTABLE,
    ElementTag.NON_INTERACTIVE_ELEMENT
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

  const handleRadioChange = async (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    
    // Save the selected option in chrome.storage
    chrome.storage.local.set({ selectedOption: value });
    
    await handleUnhighlight();
    await handleHighlight(value);
  };

  return (
    <div className="App p-2 min-w-[180px] bg-white">
      <div className="flex flex-col gap-1 mb-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="elementType"
              value={option}
              checked={selectedOption === option}
              onChange={handleRadioChange}
              className="radio radio-sm"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
      <button 
        className="btn btn-ghost btn-sm w-full text-sm" 
        onClick={handleUnhighlight}
      >
        Clear
      </button>
    </div>
  );
};

export default Popup;
