<template>
  <div class="home">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Home",

  data: () => ({}),
};
</script>
<style scoped lang="scss">
.home {
  height: 100%;
  text-align: center;
}
</style>
