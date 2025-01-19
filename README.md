# WysiwygEditor Documentation

## Overview

`WysiwygEditor` is a flexible and customizable Rich Text Editor built with React. It supports both controlled and uncontrolled modes, allowing you to manage the editor's state as needed. The component can be easily integrated into your React applications.

## Installation

To use the `WysiwygEditor`, ensure you have the necessary dependencies:

```bash
npm install draft-js draft-js-export-html


Props
WysiwygEditorProps
Usage Examples
1. Controlled Mode
In controlled mode, the state of the editor is managed by the parent component. You can pass an initial value through the value prop and handle changes with the onChange prop.

2. Uncontrolled Mode
In uncontrolled mode, the editor's state is internal, and you don't need to manage the content in the parent component.

3. Customizable Toolbar
You can provide your own toolbar by using the renderToolbar prop.


Operating Instructions
Import the Component: Include WysiwygEditor in your React component.
Pass Props: Provide the necessary props based on your requirements (controlled or uncontrolled).
Customize: Use the renderToolbar prop to create a custom toolbar if needed.
Handle Changes: Utilize the onChange callback to capture the content as needed.
Conclusion
The WysiwygEditor component is a powerful tool for adding rich text editing capabilities to your React application. Customize it as needed to fit your project's requirements.

