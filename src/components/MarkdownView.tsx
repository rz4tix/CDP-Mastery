import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';

interface MarkdownViewProps {
  content: string;
}

export function MarkdownView({ content }: MarkdownViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="markdown-body max-w-4xl"
    >
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </motion.div>
  );
}
