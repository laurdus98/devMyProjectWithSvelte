<script>
   import {createEventDispatcher} from "svelte";
   import PeopleStore from '../stores/PeopleStore.js';
   let dispatch = createEventDispatcher();
   export let length;
  let id = length, valid = false, fields = {name: '', beltColour: '', age: '', skills: []}, errors = {name: '', beltColour: '', age: '', skills: ''};
  // let fighting = false, swimming = false, developing = false;
  let {name, beltColour, age, skills} = fields;
  $: fullName = `${name} ${beltColour} ${age} ${skills} ${id}`;

const handleSubmit = (event, person) => {
event.preventDefault();
// const person = {name, beltColour, age, skills, id};
const ok = confirm(`Confermare ${fullName}?`);
ok ? PeopleStore.update(currentPeople => {
    return [person, ...currentPeople];
}) : console.log(fullName);
ok && dispatch('addPerson')
}

const submitHandler = (event) => {
event.preventDefault();
  valid = true;

  // validate name
  if(!name) {
    valid = false
    errors.name = 'Name must be at least 2 characters long';
  } else {
    errors.name = ''
  }

  // validate beltColour
  if(!beltColour) {
    valid = false
    errors.beltColour = 'BeltColour must be selected';
  } else {
    errors.beltColour = ''
  }

  // validate age
  if(!Number(age)) {
    valid = false
    errors.age = 'Age must be a number';
  } else {
    errors.age = ''
  }

  // validate skills
  if(skills.length === 0) {
    valid = false
    errors.skills = 'Skills not empty';
  } else {
    errors.skills = ''
  }

  // add
  if(valid) {
  let person = {...fields, id, name, beltColour, age, skills}
    /** PeopleStore.update(currentPeople => {
        return [person, ...currentPeople];
    }) */
    // dispatch('addPerson')
    handleSubmit(event, person)
  }

}

</script>

<form on:submit|preventDefault={submitHandler}>
  <input type="text" placeholder="Enter name" bind:value={name}>
  <div class="error">{errors.name}</div>
  <!--<input type="text" placeholder="Enter belt colour" bind:value={beltColour}>-->
  <input type="number" placeholder="Enter age" bind:value={age}>
  <div class="error">{errors.age}</div>
  <label for="skills">Skills:</label>
  <!--<input type="checkbox" bind:checked={fighting}/> fighting <br>
  <input type="checkbox" bind:checked={swimming}/> swimming <br>
  <input type="checkbox" bind:checked={developing}/> developing <br> -->
    <span style="display: inline-block;"> <input type="checkbox" bind:group={skills} value="riding"/> riding
    <input type="checkbox" bind:group={skills} value="running"/> running
    <span> <input type="checkbox" bind:group={skills} value="reading"/> reading </span>
  <div class="error">{errors.skills}</div>
  <select bind:value={beltColour}>
    <option value=""></option>
    <option value="black">black</option>
    <option value="orange">orange</option>
    <option value="white">white</option>
    <option value="grey">grey</option>
    <option value="yellow">yellow</option>
  </select>
  <div class="error">{errors.beltColour}</div>
  <button>Add Person</button>
</form>

<style>
.error {
font-weight: bold;
font-size: 12px;
color: crimson;
margin: .25rem;
}
</style>
