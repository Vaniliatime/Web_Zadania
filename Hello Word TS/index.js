function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = { firstName: "Krzysiek", lastName: "Kaszuba" };
document.body.textContent = greeter(user);
