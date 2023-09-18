import "prismjs/themes/prism.css";

import React, { useState } from "react";

import Editor from "react-simple-code-editor";
// Importing the bundled version
import Prism from "prismjs";

export const ReactEditor: React.FC = () => {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  const handleHighlight = (code: string) => {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  };

  return (
    <Editor
      value={code}
      onValueChange={setCode}
      highlight={handleHighlight}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        backgroundColor: "#f5f2f0",
      }}
    />
  );
};

export default ReactEditor;
