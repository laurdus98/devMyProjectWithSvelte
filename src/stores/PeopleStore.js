import { writable } from "svelte/store";

const PeopleStore = writable([
{name: "yoshi", beltColour: "black", age: 25, id: 0},
{name: "mario", beltColour: "red", age: 15, id: 1},
{name: "luigi", beltColour: "green", age: 20, id: 2},
{name: "toad", beltColour: "yellow", age: 23, id: 3},
{name: "browser", beltColour: "brown", age: 21, id: 4},
{name: "daisy", beltColour: "orange", age: 19, id: 5},
]);

export default PeopleStore;
