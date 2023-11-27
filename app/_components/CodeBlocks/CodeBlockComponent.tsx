import React from 'react'
import { CodeBlock, androidstudio } from "react-code-blocks"

interface CodeBlockInterface {
  code: string;
  language: string;
  showLineNumbers: boolean;
}

const CodeBlockComponent: React.FC<CodeBlockInterface> = (props) => {
  return (
    <>
        <CodeBlock
        customStyle={{ whiteSpace: "pre", paddingRight: "100px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "5px", borderRadius: "6px" }}
        text={props.code}
        language={props.language}
        showLineNumbers={props.showLineNumbers}
        theme={androidstudio}
        />
    </>
  )
}

export default CodeBlockComponent;
