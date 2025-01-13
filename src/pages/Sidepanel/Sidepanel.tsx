import React from 'react';
import './Sidepanel.css';

const Sidepanel = () => {
  console.log('Rendering Sidepanel');
  const [baseUrl, setBaseUrl] = React.useState('http://localhost:3000');

  console.log('Current baseUrl:', baseUrl); // Debug log

  React.useEffect(() => {
    console.log('useEffect running'); // Debug log
    chrome.storage.sync.get(['baseUrl'], (result) => {
      console.log('Storage result:', result); // Debug log
      if (result.baseUrl) {
        setBaseUrl(result.baseUrl);
      }
    });
  }, []);

  const iframeUrl = `${baseUrl}/embd/scenarios/91`;
  console.log('iframeUrl:', iframeUrl); // Debug log

  return (
    <div className="sidepanel-container">
      <iframe 
        src={iframeUrl}
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="Probo Labs Sidepanel"
      />
    </div>
  );
};

export default Sidepanel; 