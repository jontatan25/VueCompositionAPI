<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import EventService from '../../services/EventService.js'

const props = defineProps({
  event: {
    required: true
  }
})

const router = useRouter();

const register = async () => {
    // make API call to register for the event
    try {
      const response = await fetch('registration-url-here');
      if (response.ok) {
        // If registration API call is successful
        // Push back to the event details
        router.push({ name: 'event-details', params: { id: props.event.id } });
      } else {
        console.log('Registration failed');
        router.push({ name: 'event-details', params: { id: props.event.id } });
      }
    } catch (error) {
      console.log(error);
    }
  }

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
  <p>Register for the event Here</p>
  <button @click="register">Register Me!</button>
</template>
