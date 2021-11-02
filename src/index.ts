import React from "react"
import * as ReactDOM from 'react-dom'
import Main from "./Components/Main"
import GlobalState from "./GlobalState"
import { Exercise, ExerciseContext } from "./Types/Exercise"

GlobalState.prepareState<Array<string>>('log', [])
GlobalState.prepareState<boolean>('succes', false)
GlobalState.prepareState<Exercise>('currentExercise', {
    title: 'Hello World!',
    description: `# Make a variable called helloWorld with the content "Hello world!"`,
    initCode: '// Create a variable called helloWorld with the content "Hello world!"',
    succes: (context: ExerciseContext, logs: Array<string>) => {
        if(!('helloWorld' in context)) return { error: 'No helloWorld variable was defined' }
        if(context['helloWorld'].toLowerCase() !== 'Hello world!'.toLowerCase()) return { error: `The content of helloWorld must be "Hello world!", but got "${context['helloWorld']}"`}
    
        return true
    }
})

ReactDOM.render(
    React.createElement(Main),
    document.getElementById('root')
)