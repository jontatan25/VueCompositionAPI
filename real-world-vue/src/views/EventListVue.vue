<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import EventCard from '../components/EventCard.vue'

const events = ref(null)

onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/jontatan25/VueCompositionAPI/events')
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
