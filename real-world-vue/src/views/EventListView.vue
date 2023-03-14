<script setup>
import EventCard from '../components/EventCard.vue'
import EventService from '../services/EventService.js'
import { ref, onMounted } from 'vue'

  const props = defineProps({
    page: String,
  });

const events = ref(null)

onMounted(() => {
  EventService.getEvents(2, props.page)
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
