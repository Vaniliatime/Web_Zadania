"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldType;
(function (FieldType) {
    FieldType[FieldType["textBox"] = 1] = "textBox";
})(FieldType || (FieldType = {}));
var InputField = /** @class */ (function () {
    function InputField(name, label) {
        this.element =
            document.createElement('input');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
    }
    InputField.prototype.render = function () {
        return this.element;
    };
    InputField.prototype.getValue = function () {
        return this.element.value;
    };
    return InputField;
}());
exports.InputField = InputField;
var Form = /** @class */ (function () {
    function Form(id) {
        this.fields = new Array();
        this.formElement = document.getElementById(id);
    }
    Form.prototype.render = function () {
        // TODO: pętla wyświetlająca kolejne pola
    };
    Form.prototype.getValue = function () {
        // TODO: pętla wyświetlająca wartości kolejnych pól
    };
    ;
    return Form;
}());
exports.Form = Form;
//# sourceMappingURL=form.js.map