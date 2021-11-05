import { ExerciseContext, ExerciseError } from "../Types/Exercise";

export function CheckVariableExist(name: string, context: ExerciseContext): boolean {
    return name in context
}

export function CheckVariableEquals(name: string, value: any, context: ExerciseContext): boolean {
    return CheckVariableExist(name, context) && context[name] === value
}

export function SimpleVariableExercise(var_table: {[ key: string ]: any}): (context: ExerciseContext, logs: Array<string>) => ExerciseError | boolean {
    return (context: ExerciseContext, logs: Array<string>) => {
        for(let [ name, value ] of Object.entries(var_table)) {
            if(!CheckVariableEquals(name, value, context)) return {
                error: `Expected variable ${name} to be ${JSON.stringify(value)}, but got ${JSON.stringify(context[name])}`
            }
        }
        
        return true
    }
}