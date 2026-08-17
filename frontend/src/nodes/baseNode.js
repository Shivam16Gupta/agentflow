// baseNode.js
import { Handle, useUpdateNodeInternals } from "reactflow";
import { useEffect } from "react";

export const BaseNode = ({ id, title, children, handles = [] }) => {
  const updateNodeIntervals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeIntervals(id);
  }, [id, handles, updateNodeIntervals]);

  const targetCount = handles.filter(
    (h) => h.type === "target"
  ).length;

  const height = Math.max(80,60+targetCount*30);

  return (
    <div
      style={{
        width: 200,
        minHeight: height,
        border: "1px solid black",
        borderRadius: 8,
        padding: 10,
        position: "relative",
      }}
    >
      <div>
        <span>{title}</span>
      </div>

      <div>{children}</div>

      {handles.map((handle,index) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={
            handle.type === "target"
            ? {top: `${40 + index * 30}px`}
            : {}
          }
        />
      ))}
    </div>
  );
};
