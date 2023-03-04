<template>
  <div>
    <h2>Random People</h2>
    <ul>
      <li v-for="person in people" :key="person.login.uuid">
        {{ person.name.first }} {{ person.name.last }}
      </li>
    </ul>
    <p v-if="error">An error occurred: {{ error.message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RandomPeople',
  data() {
    return {
      people: [],
      error: null
    };
  },
  mounted() {
    axios.get('https://randomuser.me/api/?results=10')
      .then(response => {
        this.people = response.data.results;
      })
      .catch(error => {
        this.error = error;
      });
  }
};
</script>
