import "./styles.css";
import "prismjs/themes/prism.css";

import Prism from "prismjs";
import Editor from "react-simple-code-editor";

interface ReactEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  hint?: string;
}

export const ReactEditor: React.FC<ReactEditorProps> = ({
  code,
  setCode,
  hint,
}) => {
  const handleHighlight = (code: string) => {
    return Prism.highlight(code, Prism.languages.javascript, "javascript")
      .split("\n")
      .map(
        (line: string, i: number) =>
          `<span class='editorLineNumber'>${i + 1}</span>${line}`
      )
      .join("\n");
  };

  return (
    <>
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={handleHighlight}
        padding={10}
        textareaId="codeArea"
        className="editor"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
        }}
      />
      {hint?.trim() && <p className="hint">{hint}</p>}
    </>
  );
};
