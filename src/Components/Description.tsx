import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function Description({ content, title }) {
    return (
        <section>
            <h1>{ title }</h1>
            <ReactMarkdown>
                { content }
            </ReactMarkdown>
        </section>
    )
}
