<template>
  <div>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.selftext }}</p>
    </div>

    <div v-if="loading">Loading...</div>

    <div v-else>
      <button v-if="hasPrev" @click="goToPage(page - 1)">Prev</button>
      <span v-if="pageRange.length">
        <button v-for="n in pageRange" :key="n" @click="goToPage(n)" :disabled="n === page">
          {{ n }}
        </button>
      </span>
      <button v-if="hasNext" @click="goToPage(page + 1)">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      loading: false,
      posts: [],
      postCount: 0
    }
  },
  computed: {
    hasPrev() {
      return this.page > 1
    },
    hasNext() {
      return this.posts.length === this.limit
    },
    totalPages() {
      return Math.ceil(this.postCount / this.limit)
    },
    pageRange() {
      const range = []
      for (let i = 1; i <= this.totalPages; i++) {
        range.push(i)
      }
      return range
    }
  },
  async mounted() {
    await this.loadPage(this.page)
  },
  methods: {
    async loadPage(page) {
      this.loading = true
      try {
        const response = await axios.get(`https://www.reddit.com/r/gaming.json`, {
          params: {
            limit: this.limit,
            count: this.limit * (page - 1)
          }
        })
        console.log(response.data.data.children)
  
        this.loading = false
        this.posts = response.data.data.children.map((child) => child.data)
        this.postCount = response.data.data.dist
        
      } catch (error) {
        console.log(error)
      }
    },
    goToPage(page) {
      this.page = page
      this.loadPage(page)
    }
  }
}
</script>
