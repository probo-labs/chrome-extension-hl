import { highlight } from 'probolabs-js';

console.log('🔥🔥🔥 Content script loaded!', window.location.href);

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);  // Debug log
  
  if (request.action === 'highlight') {
    console.log('Highlighting elements of type:', request.elementType);
    highlight.execute([request.elementType]);
    sendResponse({ ok: true });
  } else if (request.action === 'unhighlight') {
    console.log('Unhighlighting elements');
    highlight.unexecute();
    sendResponse({ ok: true });
  }
  return true;  // Keep the message channel open for async response
});

// Inject the UMD script - use the direct filename
const script = document.createElement('script');
script.src = chrome.runtime.getURL('probolabs.umd.js');
(document.head || document.documentElement).appendChild(script);

