<script>
import homeIcon from "../../assets/icons/ic_mobile_navigarion_home@3x.png";
import homeActiveIcon from "../../assets/icons/ic_mobile_navigarion_home_active@3x.png";
import infoIcon from "../../assets/icons/ic_mobile_navigarion_info@3x.png";
import infoActiveIcon from "../../assets/icons/ic_mobile_navigarion_info_active@3x.png";

export default {
  data() {
    return {
      homeIcon,
      homeActiveIcon,
      infoIcon,
      infoActiveIcon
    };
  },
  computed: {
    isActiveRoute() {
      return (route) => this.$route.path === route;
    }
  }
};
</script>

<template>
<footer>
    <router-link to="/" class="home-icon">
      <img
        v-bind:src="isActiveRoute('/') ? homeActiveIcon : homeIcon"
        alt="home-icon"
      />
    </router-link>

    <router-link to="/about" class="about-icon">
      <img
        v-bind:src="isActiveRoute('/about') ? infoActiveIcon : infoIcon"
        alt="info-icon"
      />
    </router-link>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 -1px 15px rgba(131, 131, 131, 0.3);
}

.home-icon {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.home-icon img {
  width: 24px;
  height: 24px;
}

.about-icon {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.about-icon img {
  width: 24px;
  height: 24px;
}

@media (min-width: 1024px) {
  footer {
    display: none;
  }
}
</style>
