import React from "react"
import * as ReactDOM from 'react-dom'
import Main from "./Components/Main"
import GlobalState from "./GlobalState"
import { SimpleVariableExercise } from "./System/ExerciseChecking"
import { Exercise, ExerciseContext } from "./Types/Exercise"

export const LIST_EXERCISES: Array<Exercise> = [
    {
        title: 'Hello World!',
        description: `
## Hoe werkt deze website
De website is verdeeld in 3 vakken:
* Het linker vak geeft informatie over de opdracht.
* Het middelste vak is de plek waar je code kunt invoeren.
* Het rechter vak geeft je feedback over je getypte code.

## De opdracht

In deze opdracht ga je leren hoe je een variabele maakt.
Zo maak je aan variabele in Javascript:
\`\`\`
let (Variabele naam) = (Variabele waarde);
\`\`\`

Om deze opdracht te kunnen voltooien moet je een variabele met de naam \`helloWorld\` en de waarde \`"Hello world!"\` maken.

`,
        initCode: '',
        log: 'helloWorld',
        succes: SimpleVariableExercise({
            helloWorld: 'Hello world!'
        })
    },
    {
        title: 'Expressies',
        description: `
Expressies zijn variabelen die niet statisch zijn.
Zo heb je het statische variabele \`a\` en \`b\`.

Een expressie is bijvoorbeeld: optellen, aftrekken, delen of vermenigvuldigen van twee variabelen.
Dit kun je doen door dit letterlijk uit te typen. Bijvoorbeeld:
\`\`\`
eerste + tweede
\`\`\`
of
\`\`\`
teller / noemer
\`\`\`

## De opdracht
Maak een variabele genaamd \`resultaat\`. Zet in dit variabele een expressie die \`a\` en \`b\` optelt.

Let op! Gewoon \`45\` als waarde zetten werkt niet! 😬
`,
        initCode: 'let a = 20;\nlet b = 25;\n\n',
        log: 'resultaat',
        succes: (AST: any, context: ExerciseContext) => {
            let dec = AST.find(x => {
                return x.type == 'VariableDeclaration' && x?.declarations[0]?.init?.type == 'BinaryExpression' && 
                ((x?.declarations[0]?.init?.left?.name == 'a' && x?.declarations[0]?.init?.right?.name == 'b') || 
                (x?.declarations[0]?.init?.left?.name == 'b' && x?.declarations[0]?.init?.right?.name == 'a'))
            })

            if(!context['resultaat']) {
                return {
                    error: `Variabel resultaat bestaat niet.`
                }
            }

            if(context['resultaat'] && context['resultaat'] == 45 && !dec) {
                return { error: `Wat zei ik nou, 45 als waarde zetten werkt niet! 😠`}
            }

            if(context['resultaat'] && !dec) {
                return { error: `Zorg dat de waarde van resultaat "a + b" is.`}
            }

            if(dec && context['resultaat']) {
                return true
            }
        }
    },
    {
        title: 'Arrays',
        description: `
Arrays zijn variabelen die je als lijst kan gebruiken. Zo kan je variabelen aan de lijst toevoegen en variabelen van de lijst verwijderen.

Je kan een array maken op deze manier:
\`\`\`
let mijnArray = [0, 2, 3];
\`\`\`
Waarbij in dit geval \`0, 2, 3\` elke waarde kan zijn die je zou willen. Gescheiden door een komma.
Je kan items ook aan de array toevoegen op deze manier:
\`\`\`
(array naam).push( (waarde) );
\`\`\`
Of het laatste item van de array weghalen:
\`\`\`
(array naam).pop();
\`\`\`

## De opdracht:

Voeg 3 willekeurige nummers toe aan de array en haal daarna het laatste nummer weg.

Gebruik \`push\` en \`pop\`

`,
        initCode: 'let array = [ 4 ];',
        log: 'array',
        succes: (AST: any, context: ExerciseContext) => {
            let pushes = AST.filter(x => {
                return x.type == 'ExpressionStatement'
                    && x.expression.type == 'CallExpression'
                    && x.expression.callee.property.name == 'push'
            })

            let pops = AST.filter(x => {
                return x.type == 'ExpressionStatement'
                    && x.expression.type == 'CallExpression'
                    && x.expression.callee.property.name == 'pop'
            })

            if(pushes.length < 3) {
                return { error: `Push 3 items naar de array door \`array.push( (waarde) );\` te gebruiken`}
            }

            if(pops.length < 1) {
                return { error: `Pop 1 item van de array door \`array.pop();\` te gebruiken`}
            }

            if(context['array'] && context['array'].length != 3) {
                return { error: `Er zitten te ${ context['array'].length > 3 ? 'veel' : 'weinig'} items op de array. Heb je misschien te veel ${ context['array'].length > 3 ? 'gepusht' : 'gepopt'}?`}
            }

            return true
        }
    },
]

GlobalState.prepareState<Array<string>>('log', [])
GlobalState.prepareState<boolean>('succes', false)
GlobalState.prepareState<number>('currentExercise', 2)

ReactDOM.render(
    React.createElement(Main),
    document.getElementById('root')
)