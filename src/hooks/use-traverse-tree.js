function useTraverseTree() {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: []
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((child) => {
      return insertNode(child, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  }

  function deleteNode(tree, folderId, item, isFolder) {
    for (let i = 0; i < tree.items.length; i++) {
      if (tree.items[i] === folderId) {
        tree.items.splice(i, 0);
        return;
      } else {
        deleteNode(tree.items[i], folderId, item, isFolder);
      }
    }
    return tree;
  }

  function editNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId) {
      return { ...tree, name: item };
    }
    let latestNode = [];
    latestNode = tree.items.map((child) =>
      editNode(child, folderId, item, isFolder)
    );
    return { ...tree, items: latestNode };
  }

  return { insertNode, deleteNode, editNode };
}

export default useTraverseTree;
