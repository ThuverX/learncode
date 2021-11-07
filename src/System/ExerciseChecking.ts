import { ExerciseContext, ExerciseError } from "../Types/Exercise";

export function CheckVariableExist(name: string, context: ExerciseContext): boolean {
    return name in context
}

export function CheckVariableEquals(name: string, value: any, context: ExerciseContext): boolean {
    return CheckVariableExist(name, context) && context[name] === value
}

export function SimpleVariableExercise(var_table: {[ key: string ]: any}): (code: any, context: ExerciseContext, logs: Array<string>) => ExerciseError | boolean {
    return (code: any, context: ExerciseContext, logs: Array<string>) => {
        for(let [ name, value ] of Object.entries(var_table)) {
            if(!CheckVariableEquals(name, value, context)) return {
                error: context[name] ? 
                    `Verwachte variabel ${name} om ${JSON.stringify(value)} te zijn, maar kreeg ${JSON.stringify(context[name]) || "niks"}.` :
                    `Variabel ${name} bestaat niet.`
            }
        }
        
        return true
    }
}