<script lang="ts" setup>
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const props = defineProps({
  event: {
    required: true
  }
})

const unsavedChanges = ref(true) // define a reactive variable using ref

onBeforeRouteLeave((routeTo, routeFrom, next) => {
  if (unsavedChanges.value) {
    // access the value of reactive variable using .value
    const answer = window.confirm('Do you really want to leave? You have unsaved changes!')
    if (answer) {
      next() // <-- Confirms the navigation
    } else {
      next(false) // <-- Cancels the navigation
    }
  } else {
    next() // <-- Confirms the navigation
  }
})

</script>

<template>
  <p>Edit the event Here</p>
</template>
