import React, { useState } from 'react'
import GlobalState from '../GlobalState'
import '../Styles/default.less'
import { Exercise } from '../Types/Exercise'
import Code from './Code'
import Description from './Description'
import Result from './Result'

export default function Main() {

    let [ ex, setEx ] = GlobalState.useState<Exercise>('currentExercise', null)
    // let [ logs ] = GlobalState.useState<Array<string>>('log')

    if(!ex) return <main></main>

    return (
        <main>
            <Description content={ ex.description } title={ ex.title } />
            <Code content={ ex.initCode }/>
            <Result/>
        </main>
    )
}