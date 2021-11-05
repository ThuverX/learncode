import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function Description({ content, title }) {
    return (
        <div className='description'>
            <h1>{ title }</h1>
            <ReactMarkdown>
                { content }
            </ReactMarkdown>
        </div>
    )
}
