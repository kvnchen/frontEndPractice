function TreeNode(val) {
  this.val = val;
  this.children = {};
}

function initializeGraph(keys) {
  const graph = {};

  function createTree(word) {
    const firstLetter = word.at(0);
    if (graph[firstLetter] === undefined) {
      const root = new TreeNode(firstLetter);
      graph[firstLetter] = root;
    }
    let pointer = graph[firstLetter];

    for (let i = 1; i < word.length; i++) {
      const letter = word.at(i);
      if (pointer.children[letter] === undefined) {
        const node = new TreeNode(letter);
        pointer.children[letter] = node;
      }
      pointer = pointer.children[letter];
    }
  }

  for (const key of keys) {
    createTree(key);
  }

  return graph;
}

/**
 * 1. check if prefix exists in graph
 * 2. if it does, do dfs starting on last char of prefix
 *    pass down array of chars seen so far to children, join when reach leaf node
 */
function getKeys(prefix, graph, dataset) {
  const output = [];
  if (graph[prefix.at(0)] === undefined)
    return output;

  let pointer = graph[prefix.at(0)];
  let soFar = [prefix.at(0)];

  for (let i = 1; i < prefix.length; i++) {
    const letter = prefix.at(i);

    if (pointer.children[letter] === undefined)
      return output;
    else {
      soFar.push(letter);
      pointer = pointer.children[letter];
    }
  }
  // pointer should point at node with val === last char of prefix
  // all of prefix should be in soFar

  if (Object.keys(pointer.children).length === 0)
    return [prefix];

  function dfs(root, chars) {
    if (Object.keys(root.children).length === 0) {
      output.push(chars.join(''));
    } else {
      if (dataset[chars.join('')] !== undefined)
        output.push(chars.join(''));

      for (const letter of Object.keys(root.children)) {
        dfs(root.children[letter], [...chars, letter]);
      }
    }
  }
  dfs(pointer, soFar);

  return output;
}

export default function suggestion(prefix, dataset) {
  if (prefix === undefined || prefix === null || prefix === '')
    return [];

  const graph = initializeGraph(Object.keys(dataset));
  const keys = getKeys(prefix, graph, dataset);

  return keys.sort((a, b) => {
    if (dataset[a] > dataset[b])
      return -1;
    else if (dataset[a] < dataset[b])
      return 1;
    else return 0;
  });
}

// const dataset = {
//   'foo': 5,
//   'foobar': 7,
//   'bar': 3,
//   'hello': 2,
//   'world': 4,
//   'food': 1,
//   'focus': 10,
// };

