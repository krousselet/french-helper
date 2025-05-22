<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/alphabet">Alphabet</router-link>
    <router-link to="/expressions">Expressions</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">

@keyframes move {
  0%, 100% {
    left: -33px;
  }
  25%, 75% {
    left: 0;
  }
  50% {
    left: -33px;
  }
}

*, ::before, ::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: black;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #AC3677;
    }
  }
}
</style>
