// src/components/RichTextEditor.js
import React from 'react';
import JoditEditor from "jodit-react";

function RichTextEditor({ content, setContent }) {
  const config = {
    readonly: false,
    height: 400,
    placeholder: 'Start writing your blog post...'
  };

  return (
    <JoditEditor
      value={content}
      config={config}
      tabIndex={1}
      onBlur={newContent => setContent(newContent)}
    />
  );
}

export default RichTextEditor;