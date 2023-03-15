<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EventService from '../../services/EventService.js'

const props = defineProps({
  id: {
    required: true
  }
})
const event = ref(null)
const router = useRouter()
onMounted(() => {
  EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
      if (error.response && error.response.status == 404) {
        router.push({ name: '404Resource', params: { resource: 'event' } })
      } else {
        router.push({ name: 'NetworkError' })
      }
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div class="nav">
      <RouterLink :to="{ name: 'event-details', params: { id } }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'event-register', params: { id } }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'event-edit', params: { id } }">Edit</RouterLink>
    </div>
    <RouterView :event="event"></RouterView>
  </div>
</template>
