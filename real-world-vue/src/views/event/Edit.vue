<script setup>
import { ref, onMounted } from 'vue'
import EventService from '../../services/EventService.js'

const props = defineProps({
  event: {
    required: true
  }
})
// const event = ref(null)

// onMounted(() => {
//   EventService.getEvent(props.id)
//     .then((response) => {
//       event.value = response.data
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// })
</script>

<template>
  <p>Edit the event Here</p>
</template>
