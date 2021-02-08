<script>
   import {createEventDispatcher} from "svelte";

   let dispatch = createEventDispatcher();
   export let length;
  let name, beltColour, age, skills = [], id = length;
  // let fighting = false, swimming = false, developing = false;

  $: fullName = `${name} ${beltColour} ${age} ${skills} ${id}`;

const handleSubmit = (event) => {
event.preventDefault();
const person = {name, beltColour, age, skills, id};
confirm(`Confermare ${fullName}?`) ? dispatch('addPerson', person) : console.log(fullName);
}

</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" placeholder="Enter name" bind:value={name}>
  <!--<input type="text" placeholder="Enter belt colour" bind:value={beltColour}>-->
  <input type="number" placeholder="Enter age" bind:value={age}>
  <label for="skills">Skills:<label>
  <!--<input type="checkbox" bind:checked={fighting}/> fighting <br>
  <input type="checkbox" bind:checked={swimming}/> swimming <br>
  <input type="checkbox" bind:checked={developing}/> developing <br> -->
  <input type="checkbox" bind:group={skills} value="riding"/> riding <br>
  <input type="checkbox" bind:group={skills} value="running"/> running <br>
  <input type="checkbox" bind:group={skills} value="reading"/> reading <br>
  <select bind:value={beltColour}>
    <option value="black">black</option>
    <option value="orange">orange</option>
    <option value="white">white</option>
    <option value="grey">grey</option>
    <option value="yellow">yellow</option>
  </select>
  <button>Add Person</button>
</form>

<style>
</style>
