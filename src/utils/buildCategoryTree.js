function buildCategoryTree(categories) {
  const map = new Map();

  categories.forEach((c) => {
    map.set(c.id, { ...c, children: [] });
  });

  const tree = [];

  categories.forEach((c) => {
    const node = map.get(c.id);

    if (c.parentId) {
      const parent = map.get(c.parentId);
      if (parent) parent.children.push(node);
    } else {
      tree.push(node);
    }
  });

  return tree;
}

module.exports = buildCategoryTree;