import React from "react"
import * as ReactDOM from 'react-dom'
import Main from "./Components/Main"
import GlobalState from "./GlobalState"
import { SimpleVariableExercise } from "./System/ExerciseChecking"
import { Exercise, ExerciseContext } from "./Types/Exercise"

GlobalState.prepareState<Array<string>>('log', [])
GlobalState.prepareState<boolean>('succes', false)
GlobalState.prepareState<Exercise>('currentExercise', {
    title: 'Hello World!',
    description: `# Make a variable called helloWorld with the content "Hello world!"`,
    initCode: '/* Make your variable below */',
    succes: SimpleVariableExercise({
        helloWorld: 'Hello world!'
    })
})

ReactDOM.render(
    React.createElement(Main),
    document.getElementById('root')
)