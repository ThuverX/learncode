const acorn = require('acorn')
import { Exercise, ExerciseError } from "../Types/Exercise";
import saferEval from 'safer-eval'
import GlobalState from "../GlobalState";

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
            
            GlobalState.setState<Array<string>>('log', [...logs])

            let currentExercise = GlobalState.getState<Exercise>('currentExercise')

            let result = currentExercise.succes(context, logs)

            console.log(result)

            if((result as ExerciseError).error) {
                GlobalState.setState('succes', false)
            } else {
                GlobalState.setState('succes', true)
            }

        } catch(e) {
            let result = { error: e.split('\n')[0]}
            GlobalState.setState('succes', false)
        }
    }
}