import React from "react";
import ReactMarkdown from 'react-markdown'
import {Light as SyntaxHighlighter} from 'react-syntax-highlighter'
import {githubGist} from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import remarkGfm from 'remark-gfm'
import {MarkdownContentProps} from "@components/MarkdownContent/MarkdownContent.types";

const MarkdownContent = ({children}: MarkdownContentProps) => {
    return (<div className="markdown-content">
        <ReactMarkdown
            remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
            components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={githubGist}
                            showLineNumbers={true}
                            wrapLongLines={true}
                            language={match[1]}
                            PreTag="div"
                            {...props}>
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                }
            }}
        >{children}</ReactMarkdown>
    </div>)
}


export default MarkdownContent
