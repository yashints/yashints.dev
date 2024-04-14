import { visit } from 'unist-util-visit';
const transformCustomBlocks = ({ markdownAST }) => {
  visit(markdownAST, 'paragraph', (node, index, parent) => {
    node.children.forEach((child) => {
      if (child.value && child.value.includes('[[warning]]')) {
        child.value = child.value.replace(`[[warning]]\r\n|`, '');
        const div = {
          type: 'element',
          tagName: 'div',
          data: {
            hProperties: {
              className: 'custom-block warning',
            },
          },
          children: [
            {
              type: 'element',
              tagName: 'div',
              data: {
                hProperties: { className: 'custom-block-body' },
              },
              children: [...node.children],
            },
          ],
        };
        parent.children[index] = div;
      }

      if (child.value && child.value.includes('[[info]]')) {
        child.value = child.value.replace(`[[info]]\r\n|`, '');
        const div = {
          type: 'element',
          tagName: 'div',
          data: {
            hProperties: {
              className: 'custom-block info',
            },
          },
          children: [
            {
              type: 'element',
              tagName: 'div',
              data: {
                hProperties: { className: 'custom-block-body' },
              },
              children: [...node.children],
            },
          ],
        };
        parent.children[index] = div;
      }

      if (child.value && child.value.includes('[[danger]]')) {
        child.value = child.value.replace(`[[danger]]\r\n|`, '');
        const div = {
          type: 'element',
          tagName: 'div',
          data: {
            hProperties: {
              className: 'custom-block danger',
            },
          },
          children: [
            {
              type: 'element',
              tagName: 'div',
              data: {
                hProperties: { className: 'custom-block-body' },
              },
              children: [...node.children],
            },
          ],
        };
        parent.children[index] = div;
      }
    });
  });

  return markdownAST;
};

export default transformCustomBlocks;
