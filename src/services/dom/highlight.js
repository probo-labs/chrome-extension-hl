export const highlight = (elementType) => {
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