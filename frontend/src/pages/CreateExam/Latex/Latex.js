import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Latex = ({ tex }) => {
  const html = katex.renderToString(tex, {
    throwOnError: false,
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Latex;
