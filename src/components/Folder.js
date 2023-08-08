import React, { useState } from "react";

function Folder({
  explorer,
  handleInsertNode,
  handleEditNode,
  handleDeleteNode
}) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: true
  });
  const [inputText, setInputText] = useState("");

  function addInput(e, isFolder) {
    e.stopPropagation();
    setShowInput({ visible: true, isFolder: isFolder });
    setExpand(true);
  }

  function addNewFolder(e) {
    if (e.which === 13 && e.target.value?.length > 0) {
      setShowInput({ ...showInput, visible: false });
      setInputText("");
      handleInsertNode(explorer.id, inputText, showInput.isFolder);
    }
  }

  if (explorer.isFolder) {
    return (
      <>
        <div
          style={{ marginTop: 5 }}
          onClick={() => setExpand(!expand)}
          className="folder"
        >
          <span role="img" aria-label="folder icon">
            &#x1F4C1; {explorer.name}
          </span>

          <div>
            <button onClick={(e) => addInput(e, true)}>Folder +</button>
            <button onClick={(e) => addInput(e, false)}>File + </button>
          </div>
        </div>

        <div
          style={{
            marginLeft: 35,
            display: showInput.visible ? "block" : "none"
          }}
        >
          {showInput.isFolder ? (
            <span role="img" aria-label="file icon" style={{ marginRight: 15 }}>
              &#x1F4C1;
            </span>
          ) : (
            <span role="img" aria-label="file icon" style={{ marginRight: 15 }}>
              &#x1F5CE;
            </span>
          )}

          <input
            type="text"
            autoFocus
            onBlur={() => setShowInput({ ...showInput, visible: false })}
            className="input_field"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            onKeyDown={addNewFolder}
          />
        </div>

        {expand && (
          <div style={{ marginLeft: 15 }}>
            {explorer.items.map((c) => {
              return (
                <Folder
                  explorer={c}
                  key={c.id}
                  handleInsertNode={handleInsertNode}
                  handleDeleteNode={handleDeleteNode}
                  handleEditNode={handleEditNode}
                />
              );
            })}
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <div style={{ marginLeft: 15 }} className="file">
          <span role="img" aria-label="file icon" className="file">
            &#x1F5CE; {explorer.name}
          </span>
        </div>
      </>
    );
  }
}

export default Folder;
