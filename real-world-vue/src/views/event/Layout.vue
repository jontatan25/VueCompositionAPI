<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EventService from '../../services/EventService.js'
import { usePiniaStore } from '../../stores/PiniaStore';
import { PropType, defineProps } from 'vue'

const PStore = usePiniaStore()

const props = defineProps({
  id: {
    required: true,
    type: [String, Number] as PropType<string | number>
  }
})

const event = ref<{title: string} | null>(null) // add type assertion here
const router = useRouter()

onMounted(() => EventService.getEvent(Number(props.id))
.then((response) => {
event.value = response.data;
PStore.setEvent(response.data);
})
.catch((error) => {
console.log(error);
if (error.response && error.response.status == 404) {
router.push({ name: '404Resource', params: { resource: 'event' } });
} else {
router.push({ name: 'NetworkError' });
}
}))
</script>

<template>
  <div v-if="PStore.event">
    <h1>{{ PStore.event.title }}</h1>
    <div class="nav">
      <RouterLink :to="{ name: 'event-details', params: { id } }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'event-register', params: { id } }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'event-edit', params: { id } }">Edit</RouterLink>
    </div>
    <RouterView :event="PStore.event"></RouterView>
  </div>
</template>
