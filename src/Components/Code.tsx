import React from 'react'

import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-monokai"

import { CodeChecker } from '../System/CodeChecker'

export default function Code({ content }) {

    function onChange(newValue) {
        try {
            CodeChecker.check(newValue)
        } catch(e) {}
    }

    return (
        <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={onChange}
            fontSize="1.5rem"
            height="100%"
            width="auto"
            editorProps={{ $blockScrolling: true }}
            value={ content }
        ></AceEditor>
    )
}
