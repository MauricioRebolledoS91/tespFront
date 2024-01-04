import { AbstractControl, ValidationErrors } from "@angular/forms";

export function restrictedWords(words: string[]){
    return (control: AbstractControl): ValidationErrors | null => {
        const invalidWords = words
            .map(w => control.value.includes(w) ? w : null)
            .filter(w => w!== null);
    // si el control contiene una palabra llamada 'foo' entonces retorne la propiedad restrictedwors como true
    // sino, retorne null. La propiedad restrictedWords se agregará al objeto errors del control
    //por lo tanto, lo podemos usar en el temmplate
        return invalidWords.length > 0
            ? { restrictedWords: invalidWords.join(', ') }
            : null
    }
}