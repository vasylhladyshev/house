<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
};
</script>

<template>
  <div class="headerOnDesktop">
    <div class="container">
      <img src="../../assets/icons/img_logo_dtt@3x.png" alt="logo" />
      <router-link
        to="/"
        class="nav-link"
        :class="{ active_link: route.path === '/' }">
        Houses
      </router-link>
      <router-link
        to="/about"
        class="nav-link"
        :class="{ active_link: route.path === '/about' }"
      >
        About
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.headerOnDesktop {
  display: none;
  background-color: white;
}

@media (min-width: 1024px) {
  .headerOnDesktop {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: block;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .container {
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .headerOnDesktop img {
    height: 30px;
    max-width: 1024px;
  }

  .nav-link {
    cursor: pointer;
    text-decoration: none;
    color: #c3c3c3;
    font-size: 14px;
    font-family: Montserrat-SemiBold;

  }

  .active_link {
    color: black !important;
  }
}
</style>
