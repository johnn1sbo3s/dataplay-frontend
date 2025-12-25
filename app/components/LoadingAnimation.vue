<template>
  <div
    v-for="i in 3"
    :key="i"
    class="jumping-ball shadow-md shadow-primary/20 bg-primary"
  />
</template>

<style scoped>
.jumping-ball {
  width: 8px;
  height: 8px;
  border-radius: 50%;

  animation: jumping-ball 1s infinite ease-in-out;
}

.jumping-ball:nth-child(1) {
  animation-delay: 0s;
}
.jumping-ball:nth-child(2) {
  animation-delay: 0.15s;
}
.jumping-ball:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes jumping-ball {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
