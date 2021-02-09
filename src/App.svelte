<script>
import {onMount, onDestroy} from "svelte";
import PeopleStore from './stores/PeopleStore.js';
import Modal from './shared/Modal.svelte';
import AddPersonForm from './shared/AddPersonForm.svelte';
let showModal = false, people = [];
const toggleModal = () => {
showModal = !showModal;
}
/*PeopleStore.subscribe(data => {

	people = data;

}) **/
const unsub = PeopleStore.subscribe(data => {

	people = data;

})
onMount(() => {
	// maybe get data from db
	console.log("unmounted");
});
onDestroy(() => {
	// unsub from store
	console.log("destroyed");
	unsub();
});
const handleClick = ({id}) => event => {
event.preventDefault();
// delete the person from people
	// console.log(id);
	const idxId = people.findIndex((person) => person.id == id);
	// people = confirm(`Delete ${people[idxId]["name"]}?`) ? people.filter((person) => person.id !== id) : people;
	confirm(`Delete ${people[idxId]["name"]}?`) ? PeopleStore.update(currentPeople => {
		return currentPeople.filter((person) => person.id !== id)
	}) : ''
}
let {length} = $PeopleStore

const addPerson = (/*{detail} **/) => {
	// console.log(detail);
	// people = [detail, ...people];
	showModal = false
	length = $PeopleStore.length;
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
	<!--{#each $PeopleStore as person (person.id)}-->
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
