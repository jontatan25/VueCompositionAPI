<script lang="ts" setup>
import { inject, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EventService from '../../services/EventService.js'
import { usePiniaStore } from '../../stores/PiniaStore';
import { PropType } from 'vue'
interface EventProp {
  title: string,
  id : Number,
  // add other properties here
}

const props = defineProps({
  event: {
    required: true,
    type: Object as PropType<EventProp>,
  }
})

//gathering Global store info
// const GStore = inject('GStore')

const PStore = usePiniaStore()

const router = useRouter()

const register = async () => {

  //setting message for Global Store
  let newMEssage = 'You are successfully registered for ' + props.event.title
  PStore.updateMessage(newMEssage)
  setTimeout(() => {  // After 3 seconds remove it
    newMEssage = ''
    PStore.updateMessage(newMEssage)
  }, 3000)
  // make API call to register for the event
  
  try {
    const response = await fetch('registration-url-here')
    if (response.ok) {
      // If registration API call is successful
      // Push back to the event details
      router.push({ name: 'event-details', params: { id: props.event.id.toString() } })
    } else {
      console.log('Registration failed')
      router.push({ name: 'event-details', params: { id: props.event.id.toString() } })
    }
  } catch (error) {
    console.log(error)
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
