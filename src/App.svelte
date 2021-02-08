<script>

import Modal from './Modal.svelte';
import AddPersonForm from './AddPersonForm.svelte';
let showModal = false;

const toggleModal = () => {
showModal = !showModal;
}
let people = [
{name: "yoshi", beltColour: "black", age: 25, id: 0},
{name: "mario", beltColour: "red", age: 15, id: 1},
{name: "luigi", beltColour: "green", age: 20, id: 2},
{name: "toad", beltColour: "yellow", age: 23, id: 3},
{name: "browser", beltColour: "brown", age: 21, id: 4},
{name: "daisy", beltColour: "orange", age: 19, id: 5},
];
const handleClick = ({id}) => event => {
event.preventDefault();
// delete the person from people
	// console.log(id);
	const idxId = people.findIndex((person) => person.id == id);
	people = confirm(`Delete ${people[idxId]["name"]}?`) ? people.filter((person) => person.id !== id) : people;
}
let {length} = people;

const addPerson = ({detail}) => {
	//console.log(detail);
	people = [detail, ...people];
	showModal = false;
}

</script>

<Modal message="Hey, there again" {showModal} on:click={toggleModal}>
<h3>Add a new Person</h3>
<AddPersonForm on:addPerson={addPerson} {length} />
<!--<div slot="title" />-->
</Modal>
{#if length > 20}
	<p>Greater than 20</p>
{:else if length > 5}
	<p>Greater than 5</p>
{:else}
	<p>Not greater than 5</p>
{/if}

<main>
<h1>People APIs</h1>
<!--<button on:click|once={toggleModal}>Open Modal</button>-->
<button on:click={toggleModal}>Open Modal</button> <br >
	{#each people as person (person.id)}
		<div style="border: 2px solid crimson; padding: .3rem; margin: 1.25rem; width: 25%; height: 30%; display: inline-block;">
			<h4>{person.name}</h4>
			{#if person.beltColour === 'black'}
				<p><strong>Master {person.name}</strong></p>
			{/if}
			<p>{person.age} years old, {person.beltColour} belt</p>
			<button on:click={handleClick(person)}>delete</button>
		</div>
		{:else}
		<p>There are no people to show... </p>
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
