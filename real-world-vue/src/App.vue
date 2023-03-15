<script setup>
import { inject } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
const GStore = inject('GStore')
</script>

<template>
  <div id="app">
    <div id="flashMessage" v-if="GStore.flashMessage">
      {{ GStore.flashMessage }}
    </div>
    <header>
      <div class="nav">
        <nav>
          <RouterLink to="/">Events</RouterLink> |
          <RouterLink to="/about">About</RouterLink>
          <!-- <RouterLink to="/clients">Clients</RouterLink>
          <RouterLink to="/posts">Posts</RouterLink> -->
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
.nav {
  padding: 50px;
}
.nav a {
  font-weight: bold;
  font-size: 1.1em;
  color: #2c3e50;
}
.nav a.router-link-exact-active {
  color: #42b983;
}
h2 {
  font-size: 20px;
}

@keyframes yellowfade {
  from {
    background: #42b983;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
