import React, { useState } from 'react'
import { LIST_EXERCISES } from '..'
import GlobalState from '../GlobalState'
import '../Styles/default.less'
import { Exercise } from '../Types/Exercise'
import Code from './Code'
import Description from './Description'
import Result from './Result'

export default function Main() {

    let [ ex ] = GlobalState.useState<number>('currentExercise')

    if(ex === -1) return (
        <main className="frontpage">
            <h1>LEARN CODE</h1>
            <p>Prototype voor het leren van programmeren!</p>
            <div className="button start" onClick={ () => GlobalState.setState<number>('currentExercise', 0) }>Start</div>
            <a href="https://forms.gle/zPgEBUMfdhWvyrp49">Vul de form in</a>
        </main>
    )

    return (
        <main className="exercise">
            <Description content={ LIST_EXERCISES[ex].description } title={ LIST_EXERCISES[ex].title } />
            <Code content={ LIST_EXERCISES[ex].initCode }/>
            <Result/>
        </main>
    )
}