<script lang="ts" setup>
import { EventItem } from '../../types'

defineProps({
  event: {
    type: Object as () => EventItem,
    required: true
  }
})
</script>

<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>
