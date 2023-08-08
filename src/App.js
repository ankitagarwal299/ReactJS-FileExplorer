import React, { useState } from "react";
import explorer from "./data/folderData.js";
import Folder from "./components/Folder.js";
import useTraverseTree from "./hooks/use-traverse-tree";

import "./styles.css";

//https://www.youtube.com/watch?v=20F_KzHPpvI&t=12s

//https://github.com/piyush-eon/frontend-interview-questions/tree/master/reactjs-interview-questions/file-explorer

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode, editNode } = useTraverseTree();

  function handleInsertNode(folderId, item, isFolder) {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  }

  function handleDeleteNode(folderId, item, isFolder) {
    const finalTree = deleteNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  }

  function handleEditNode(folderId, item, isFolder) {
    const finalTree = editNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  }

  return (
    <div className="App">
      <Folder
        explorer={explorer}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleEditNode={handleEditNode}
      />
    </div>
  );
}
