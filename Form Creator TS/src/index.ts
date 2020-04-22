import {InputField} from "./form";

// const form = new Form('form-wrapper');
console.log(document);
const input = new InputField('age','age');
// @ts-ignore
document.getElementById('main').appendChild(input.render());
console.log('x');
