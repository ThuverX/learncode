export interface ExerciseContext {
    [key: string]: any
}

export interface ExerciseError {
    error: string
}

export interface Exercise {
    title: string,
    description: string,
    initCode: string,
    log?: string,
    succes: (code: any, context?: ExerciseContext, logs?: Array<string> ) => boolean | ExerciseError
}