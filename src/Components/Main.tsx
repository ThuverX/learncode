import React, { useState } from 'react'
import '../Styles/default.less'
import { Exercise } from '../Types/Exercise'
import Code from './Code'
import Description from './Description'
import Result from './Result'

export default function Main() {

    let [ ex, setEx ] = useState<Exercise>({
        title: 'yeet',
        description: `# The question`,
        initCode: 'console.log("yeetuth")'
    })

    return (
        <main>
            <Description content={ ex.description } title={ ex.title } />
            <Code content={ ex.initCode }/>
            <Result/>
        </main>
    )
}