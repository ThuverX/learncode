import React from 'react'

import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-monokai"

import saferEval from 'safer-eval'

export default function Code({ content }) {

    function onChange(newValue) {
        try {
            console.log(saferEval(newValue, {
                console: {
                    log: (x) => console.log('haha', x)
                }
            }))
        } catch(err) {
            console.log(err)
        }
        // console.log("change", newValue);
    }

    return (
        <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={onChange}
            fontSize="1.5rem"
            editorProps={{ $blockScrolling: true }}
            value={ content }
        ></AceEditor>
    )
}
