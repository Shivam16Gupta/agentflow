// textNode.js
import { useState, useMemo } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    console.log(currText);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const variables = useMemo(() => {
    const regex = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

    const found = new Set();
    let match;

    while ((match = regex.exec(currText)) !== null) {
      found.add(match[1]);
    }

    console.log(found);
    return [...found];
  }, [currText]);

  const handles = useMemo(() => {
    const inputHandle = variables.map((variable, index) => ({
      id: `${id}-${variable}`,
      type: "target",
      position: Position.Left,
    }));

    const outputHandle = {
      id: `${id}-output`,
      type: "source",
      position: Position.Right,
    };
    console.log(...inputHandle);
    return [...inputHandle, outputHandle];
  }, [variables, id]);

  return (
    <BaseNode id={id} title="Text" handles={handles}>
      <div>
        <label>
          Text:
          <textarea value={currText} onChange={handleTextChange} />
        </label>
      </div>
    </BaseNode>
  );
};
