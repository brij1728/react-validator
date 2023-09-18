import "prismjs/themes/prism.css";

import Editor from "react-simple-code-editor";
// Importing the bundled version
import Prism from "prismjs";

interface ReactEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

export const ReactEditor: React.FC<ReactEditorProps> = ({ code, setCode }) => {
  const handleHighlight = (code: string) => {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  };

  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
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
