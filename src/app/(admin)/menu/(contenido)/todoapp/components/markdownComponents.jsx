import React from 'react';
import remarkGfm from 'remark-gfm';

export const mdRemarkPlugins = [remarkGfm];

// https://www.contentful.com/blog/react-markdown/

export const mdComponents = {
  em: ({ node, ...props }) => <em className="text-gray-700 italic" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-semibold text-gray-800" {...props} />,
  p: ({ node, ...props }) => <p className="mb-1" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc space-y-1 pl-5" {...props} />,
  ol: ({ node, ...props }) => <ol className="list-decimal space-y-1 pl-5" {...props} />,
  li: ({ node, ...props }) => <li className="ml-0" {...props} />,
  a: ({ node, ...props }) => <a className="text-blue-600 underline" {...props} />,
  code: ({ node, inline, className, children, ...props }) =>
    inline ? (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm" {...props}>
        {children}
      </code>
    ) : (
      <pre className="overflow-auto rounded bg-gray-100 p-2" {...props}>
        <code className="font-mono text-sm">{children}</code>
      </pre>
    ),
};

export default mdComponents;
