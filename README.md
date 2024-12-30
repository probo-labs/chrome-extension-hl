# Chrome Extension Highlighter

A Chrome extension that helps highlight different types of UI elements on any webpage.

## Installation Instructions

1. Download the `chrome-extension-hl.zip` file
2. Unzip the file to a folder on your computer
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top right corner
5. Click "Load unpacked" in the top left
6. Select the unzipped folder that contains the extension files
7. The extension icon should now appear in your Chrome toolbar

## Usage

1. Click the extension icon in your Chrome toolbar
2. Select an element type from the dropdown to highlight all elements of that type on the current page
3. Use the "Clear" button to remove all highlights
4. Select "-- please select --" to reset the dropdown and remove highlights

## For Developers

If you want to modify the extension:

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Create distributable zip:
   ```bash
   npm run zip
   ```

## Features

- Highlights different types of UI elements:
  - Text inputs
  - Buttons
  - Links
  - Select dropdowns
  - Checkboxes
  - Radio buttons
  - Textareas
  - Toggle switches

# Cloned from:

https://github.com/lxieyang/chrome-extension-boilerplate-react
