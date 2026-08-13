// baseNode.js
import { Handle,useUpdateNodeInternals } from 'reactflow';
import { useEffect } from "react";


export const BaseNode = ({
  id,
  title,
  children,
  handles = [],
}) => {

  const updateNodeIntervals = useUpdateNodeInternals();

  useEffect(()=>{
    updateNodeIntervals(id);
  },[id,handles,updateNodeIntervals]);

  let targetIndex = 0;

  return (
    <div
      style={{
        width: 200,
        minHeight: 80,
        border: '1px solid black',
        borderRadius: 8,
        padding: 10,
        position: 'relative',
      }}
    >
      <div>
        <span>{title}</span>
      </div>

      <div>
        {children}
      </div>

      {handles.map((handle) =>{ 
        let style = {
          ...handle.style,
        };

        if (handle.type === "target") {
          style.top = `${40 + targetIndex * 30}px`;
          targetIndex++;
        }

        if (handle.type === "source") {
          style.top = "50%";
        }
        console.log(targetIndex);
        return (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={style}
        />
      );
    }
      )}
    </div>
  );
};