import React from 'react'
import { CodeBlock, androidstudio, atomOneLight } from "react-code-blocks"

interface CodeBlockInterface {
  code: string;
  language: string;
  showLineNumbers: boolean;
}

const CodeBlockComponent: React.FC<CodeBlockInterface> = (props) => {
  return (
    <>
        <CodeBlock
        customStyle={{ whiteSpace: "pre", paddingRight: "100px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "5px", borderRadius: "6px", border: "1px solid #e5e5e5", maxWidth: "100vw" }}
        text={props.code}
        language={props.language}
        showLineNumbers={props.showLineNumbers}
        theme={atomOneLight}
        />
    </>
  )
}

export default CodeBlockComponent;
