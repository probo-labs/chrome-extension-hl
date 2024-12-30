import { ElementTag } from '../index';

export const highlight = {
  execute: function(elementType, ElementTag) {
    // Add highlight styles if they don't exist
    if (!document.getElementById('highlight-styles')) {
      const style = document.createElement('style');
      style.id = 'highlight-styles';
      style.textContent = `
        .extension-highlighted {
          border: 2px solid red !important;
          background-color: rgba(255, 0, 0, 0.1) !important;
          transition: all 0.2s ease-in-out;
        }
      `;
      document.head.appendChild(style);
    }

    console.log('Highlighting elements of type:', elementType);
    
    const findDropdowns = () => {
      const dropdowns = [];
      dropdowns.push(...document.querySelectorAll('select'));
      dropdowns.push(...document.querySelectorAll('[role="combobox"], [role="listbox"], [role="dropdown"]'));
      dropdowns.push(...document.querySelectorAll('[class*="dropdown" i], [class*="select" i], [class*="combobox" i]'));
      dropdowns.push(...document.querySelectorAll('[aria-haspopup="true"], [aria-haspopup="listbox"]'));
      return Array.from(new Set(dropdowns));
    };

    const findClickables = () => {
      const clickables = [];
      clickables.push(...document.querySelectorAll('a[href]'));
      clickables.push(...document.querySelectorAll('button'));
      clickables.push(...document.querySelectorAll('input[type="button"], input[type="submit"], input[type="reset"]'));
      clickables.push(...document.querySelectorAll('[role="button"]'));
      clickables.push(...document.querySelectorAll('[tabindex="0"]'));
      clickables.push(...document.querySelectorAll('[onclick]'));
      return Array.from(new Set(clickables));
    };

    const findToggles = () => {
      const toggles = [];
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const togglePattern = /switch|toggle|slider/i;
      
      checkboxes.forEach(checkbox => {
        let isToggle = false;
        if (togglePattern.test(checkbox.className) || togglePattern.test(checkbox.getAttribute('role'))) {
          isToggle = true;
        }
        // ... rest of toggle detection logic
        if (isToggle) toggles.push(checkbox);
      });
      return toggles;
    };

    const elements = [];
    // Element selection logic using the helper functions
    if (elementType === ElementTag.INPUT_TEXT || elementType === ElementTag.TEXTAREA) {
      elements.push(...document.querySelectorAll('input'));
      elements.push(...document.querySelectorAll('textarea'));
      elements.push(...document.querySelectorAll('[contenteditable="true"]'));
    }
    if (elementType === ElementTag.INPUT_SELECT) {
      elements.push(...findDropdowns());
    }
    if (elementType === ElementTag.INPUT_CHECKBOX) {
      elements.push(...document.querySelectorAll('input[type="checkbox"]'));
    }
    if (elementType === ElementTag.INPUT_RADIO) {
      elements.push(...document.querySelectorAll('input[type="radio"]'));
    }
    if (elementType === ElementTag.BUTTON || elementType === ElementTag.LINK) {
      elements.push(...findClickables());
    }
    if (elementType === ElementTag.LINK) {
      elements.push(...document.querySelectorAll('a'));
    }
    if (elementType === ElementTag.TOGGLE_SWITCH) {
      elements.push(...findToggles());
    }

    // Remove SVGs and add highlight class
    elements.forEach(element => {
      element.querySelectorAll('svg').forEach(svg => svg.remove());
      element.classList.add('extension-highlighted');
    });

    console.log(`Found ${elements.length} elements of type ${elementType}`);
  },

  unexecute: function() {
    // Remove all highlighted elements
    document.querySelectorAll('.extension-highlighted').forEach(element => {
      element.classList.remove('extension-highlighted');
    });

    // Optionally remove the style tag
    const style = document.getElementById('highlight-styles');
    if (style) {
      style.remove();
    }

    console.log('Removed all highlights');
  }
};