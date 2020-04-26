export enum InputFieldType {
    text,
    date,
    email,
    radio,
    checkbox
}


interface Field {
    name: string;
    label: string;
    type?: InputFieldType;

    render(): HTMLElement;

    getValue(): any;
}

class FieldLabel {
    element: HTMLLabelElement

    constructor(htmlFor: string, label: string) {
        this.element = <HTMLLabelElement>document.createElement('label');
        this.element.setAttribute('for', htmlFor);

        let spanEl = document.createElement('span');
        spanEl.textContent = label;
        this.element.appendChild(spanEl);
    }

    render(): HTMLElement {
        return this.element;
    }
}


export class InputField implements Field {
    name: string;
    label: string;
    type: InputFieldType;
    element: HTMLInputElement;

    constructor(name: string, label: string, type: InputFieldType) {
        this.element =
            <HTMLInputElement>document.createElement('input');
        this.name = name;
        this.label = label;
        this.type = type;
        this.element.name = this.name;
        this.element.type = InputFieldType[this.type];
    }

    render(): HTMLElement {
        let el = new FieldLabel(this.name, this.label).render();
        el.appendChild(this.element);
        return el;
    }

    getValue(): any {
        if (this.type === InputFieldType.checkbox) {
            return this.element.checked;
        }

        return this.element.value
    }
}

export class SelectField implements Field {
    name: string;
    label: string;
    options: Array<{
        text: string;
        value: string;
    }>
    element: HTMLSelectElement;

    constructor(name: string, label: string, options: { text: string; value: string; }[]) {
        this.element =
            <HTMLSelectElement>document.createElement('select');
        this.name = name;
        this.label = label;
        this.options = options;
        this.element.name = this.name;
    }

    render(): HTMLElement {
        this.options.forEach((option) => {
            let optionEl = <HTMLOptionElement>document.createElement('option');
            optionEl.text = option.text;
            optionEl.value = option.value;
            this.element.appendChild(optionEl);
        })

        let el = new FieldLabel(this.name, this.label).render();
        el.appendChild(this.element);
        return el;
    }

    getValue(): any {
        return this.element.value
    }
}

export class TextareaField implements Field {
    name: string;
    label: string;
    element: HTMLTextAreaElement;

    constructor(name: string, label: string) {
        this.element =
            <HTMLTextAreaElement>document.createElement('textarea');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
    }

    render(): HTMLElement {
        let el = new FieldLabel(this.name, this.label).render();
        el.appendChild(this.element);
        return el;
    }

    getValue(): any {
        return this.element.value
    }
}

export class Form {
    fields: Field[];
    formElement: HTMLElement | null;

    constructor(id: string) {
        this.fields = [];
        this.formElement = document.getElementById(id);
        // @ts-ignore
        window.form = this;
    }

    render(): void {
        if (!this.formElement) {
            return;
        }

        this.fields.forEach((field) => {
            // @ts-ignore
            this.formElement.appendChild(field.render());
        })
    }

    getValue(): object {
        let fieldValues = {};
        this.fields.forEach((field) => {
            // @ts-ignore
            fieldValues[field.name] = field.getValue();
        })

        return fieldValues;
    };

    loadValues(values: object): void{
        // Object.entries(values).forEach((item)=>{
        //     this.fields[item.name] = item.value;
        // })
    }
}

export class Table {
    formValuesList: Array<Object>
    container: HTMLElement | null;

    constructor(id: string) {
        this.formValuesList = [];
        this.container = document.getElementById(id);
        // @ts-ignore
        window.table = this;
    }

    render(): void {
        let tabCell;
        if (!this.container){
            return;
        }

        let i: number;
        let table = document.createElement('table');

        let col = [];
        for (i = 0; i < this.formValuesList.length; i++) {
            for (const key in this.formValuesList[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        col.push('Edytuj')

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        let tr = table.insertRow(-1);                   // TABLE ROW.

        for (i = 0; i < col.length; i++) {
            const th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (i = 0; i < this.formValuesList.length; i++) {

            tr = table.insertRow(-1);

            for (let j = 0; j < col.length -1; j++) {
                tabCell = tr.insertCell(-1);
                // @ts-ignore
                tabCell.innerHTML = this.formValuesList[i][col[j]];
            }

            tabCell = tr.insertCell(-1);
            let editBtn = <HTMLButtonElement>document.createElement('button');
            editBtn.innerText = 'Edit'
            editBtn.setAttribute('data-id',String(i));
            editBtn.addEventListener('click',this.edit);

            tabCell.innerHTML = '';
            tabCell.appendChild(editBtn);
        }

        this.container.innerHTML = '';
        this.container.appendChild(table);

    }

    add(formValues: object): void {
        this.formValuesList.push(formValues);
        console.log(this.formValuesList);
        this.render()
    }

    edit(): void {
        console.log(this);
    }
}
