import React, { useEffect, useRef } from "react";

function ContextMenu({ options, cordinates, contextMenu, setContextMenu }) {
  const contextMenuRef = useRef(null);
  
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if(e.target.id !== 'context-opener'){
        if(contextMenuRef.current && !contextMenuRef.current.contains(e.target)){
          setContextMenu(false);
        }
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])
  const handleClick = (e, cb) => {
    e.stopPropagation();
    setContextMenu(false)
    cb();
  };

  return(
    <div className={`bg-dropdown-background fixed py-2 z-[100] shadow-xl`}
      ref={contextMenuRef}
      style={{top: cordinates.y, left: cordinates.x}}
    >
      <ul>
        {
          options.map(({name, cb}) => (
            <li key={name} className="px-5 py-2 cursor-pointer hover:bg-background-default-hover" onClick={(e) => handleClick(e, cb)}>
              <span className="text-white">
                {name}
              </span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default ContextMenu;
