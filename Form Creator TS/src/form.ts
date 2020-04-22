enum FieldType {
    textBox = 1,
}


interface Field {
    name: string;
    label: string;
    type: FieldType;

    render(): HTMLElement;

    getValue(): any;
}


export class InputField implements Field {
    name: string;
    label: string;
    type: FieldType = 1;
    element: HTMLInputElement;

    constructor(name: string, label: string) {
        this.element =
            <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
    }

    render(): HTMLElement {
        return this.element;
    }

    getValue(): any {
        return this.element.value
    }
}

// export class Form {
//     fields: Field[];
//     formElement: HTMLElement;
//
//     constructor(id: string) {
//         this.fields = new Array();
//         this.formElement = document.getElementById(id);
//     }
//
//     render(): void {
//         // TODO: pętla wyświetlająca kolejne pola
//     }
//
//     getValue(): void {
//         // TODO: pętla wyświetlająca wartości kolejnych pól
//     };
// }
