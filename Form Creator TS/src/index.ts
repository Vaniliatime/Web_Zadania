import {Form, InputField, InputFieldType, SelectField, TextareaField, Table} from "./form";

const inputName = new InputField('Imie', 'Imię', InputFieldType.text);
const inputSurname = new InputField('Nazwisko', 'Nazwisko', InputFieldType.text);
const inputEmail = new InputField('Email', 'E-mail', InputFieldType.email);
const selectFieldOfStudy = new SelectField('Kierunek', 'Wybrany kierunek studiów', [
    {
        text: 'Informatyka',
        value: 'IT',
    },
    {
        text: 'Grafika',
        value: 'Graphic'
    }
]);
const checkboxELearningPrefer = new InputField('eLearning', 'Czy preferujesz e-learning', InputFieldType.checkbox);
const textareaComments = new TextareaField('Uwagi', 'Uwagi');


const mainForm = new Form('mainForm');
const table = new Table('table');
mainForm.fields.push(inputName, inputSurname, inputEmail, selectFieldOfStudy, checkboxELearningPrefer, textareaComments);
mainForm.render();

const checkFormBtn = document.getElementById('checkForm');
if (checkFormBtn) {
    checkFormBtn.addEventListener('click', function () {
        const values = mainForm.getValue();
        table.add(values);
    });
}
