import React, { useEffect, useState } from 'react';
import './Options.css';
import '../../styles/tailwind.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  const [baseUrl, setBaseUrl] = useState('http://localhost:3000');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved base URL when component mounts
    chrome.storage.sync.get(['baseUrl'], (result) => {
      if (result.baseUrl) {
        setBaseUrl(result.baseUrl);
      }
    });
  }, []);

  const handleSave = () => {
    chrome.storage.sync.set({ baseUrl }, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000); // Hide message after 2 seconds
    });
  };

  return (
    <div className="p-4 bg-base-100 min-h-screen">
      <div className="max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">{title}</h1>
        <div className="flex gap-2">
          <input
            type="text"
            className="input input-bordered flex-1"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="Enter base URL"
          />
          <button 
            className="btn btn-primary"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        {saved && (
          <div className="text-success mt-2">Settings saved!</div>
        )}
      </div>
    </div>
  );
};

export default Options;
