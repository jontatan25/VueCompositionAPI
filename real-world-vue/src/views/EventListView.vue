<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous
      </RouterLink>
      <RouterLink
        id="page-next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

import { EventItem } from '@/types'

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard
  },
  data() {
    return {
      events: [] as EventItem[],
      totalEvents: 0
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {

    return EventService.getEvents(2, parseInt(String(routeTo.query.page)) || 1)
      .then((response) => {
        next((comp:any) => {
          comp.events = response.data
          comp.totalEvents = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
    
  },
  beforeRouteUpdate(routeTo) {

    EventService.getEvents(2, parseInt(String(routeTo.query.page)) || 1)
      .then((response) => {
        this.events = response.data
        this.totalEvents = response.headers['x-total-count']
      })
      .catch(() => {
        return { name: 'NetworkError' }
      })
     
  },
  computed: {
    hasNextPage() {
      var totalPages = Math.ceil(this.totalEvents / 2)
      return this.page < totalPages
    }
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
