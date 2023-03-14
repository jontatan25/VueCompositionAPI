<script setup>
import { ref, onMounted } from 'vue'
import EventService from '../../services/EventService.js';

const props = defineProps({
  id: {
    required: true
  }
})
const event = ref(null)

onMounted(() => {
  EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })  
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div class="nav">
      <RouterLink :to="{ name: 'event-details', params: { id } }"
        >Details</RouterLink
      >
      |
      <RouterLink :to="{ name: 'event-register', params: { id } }"
        >Register</RouterLink
      >
      |
      <RouterLink :to="{ name: 'event-edit', params: { id } }"
        >Edit</RouterLink
      >
    </div>
    <RouterView :event="event"></RouterView>
  </div>
</template>

