// inputNode.js
import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    console.log("Selected Files:", files);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      handles={[
        {
          id: `${id}-value`,
          type: "source",
          position: Position.Right,
        },
      ]}
    >
      <label>
        Name:
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </label>

      <label>
        Type:
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>

      {inputType ==="File" && (
        <>
          <input type="file" multiple onChange={handleFileChange} />

          {selectedFiles.length > 0 && (
            <div>
              <h4>Selected File:</h4>
              <ul>
                {selectedFiles.map((file,index)=>(
                  <li key={index}>
                    {file.name} ({(file.size /1024).toFixed(2)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}

        </>
      )
      }
    </BaseNode>
  );
};
