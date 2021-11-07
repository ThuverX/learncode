const acorn = require('acorn')
import { Exercise, ExerciseError } from "../Types/Exercise";
import saferEval from 'safer-eval'
import GlobalState from "../GlobalState";
import { LIST_EXERCISES } from "..";

export class CodeChecker {
    public static check(code: string): void {
        try {
            let AST = acorn.parse(code, {ecmaVersion: 2020})
            let vars = AST.body.filter(x => x.type === 'VariableDeclaration')
                .map(x => x.declarations[0].id.name).join(', ')
            
            let logs = []
            let context = saferEval(`(function() {${ code };; return {${vars}}}).apply({})`, {
                console: {
                    log: (...args) => logs.push(args.join(' '))
                }
            })
            
            let currentExercise = LIST_EXERCISES[GlobalState.getState<number>('currentExercise')]
            
            if(currentExercise.log)
                logs.push(currentExercise.log + ': ' + context[currentExercise.log], '--------------------------------')

            let result = currentExercise.succes(AST.body, context, logs)
            
            if((result as ExerciseError).error) {
                GlobalState.setState('succes', false)
                logs.push((result as ExerciseError).error)
            } else {
                logs.push('Succes! Ga naar de volgende opgave.')
                GlobalState.setState('succes', true)
            }
            
            GlobalState.setState<Array<string>>('log', [...logs])
        } catch(e) {
            let result = { error: e.split('\n')[0]}
            GlobalState.setState('succes', false)
        }
    }

    public static next(): void {
        if(GlobalState.getState<boolean>('succes')) {
            let i = GlobalState.getState<number>('currentExercise')
            if(LIST_EXERCISES[i + 1]) {
                GlobalState.setState<number>('currentExercise', i + 1)
                GlobalState.setState<Array<string>>('log', [])
            } else {
                GlobalState.setState<number>('currentExercise', -1)
            }
        }
    }
}