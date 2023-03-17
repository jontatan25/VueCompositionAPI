<script lang="ts" setup>

interface Event {
  time: string
  date: string
  location: string
  description: string
}

defineProps({
  event: {
    type: Object as () => Event,
    required: true
  }
})
</script>

<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>
