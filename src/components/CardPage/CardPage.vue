<script>
import CardItem from "../CardItem/CardItem.vue";
import { useRoute } from "vue-router";
import { ref, computed, watch, onMounted } from "vue";
import { fetchHouseById } from "@/services/api";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    openModalDelete: {
      type: Function,
      required: true,
    },
  },
  components: {
    CardItem,
  },
  computed: {
    formatedSize() {
      return this.item ? this.item.size + " m2" : "";
    },
    formatedConstructionYear() {
      return this.item ? "Built in " + this.item.constructionYear : "";
    },
    hasGarage() {
      return this.item ? (this.item.hasGarage ? "Yes" : "No") : "";
    },
    randomItems() {
      if (!this.item) return [];
      const filteredData = this.data.filter((el) => el.id !== this.item.id);
      const shuffled = [...filteredData];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, 3);
    },
  },

  setup(props) {
    const route = useRoute();
    const itemId = computed(() => Number(route.params.id));
    const item = ref(null);

    const loadItem = async () => {
      try {
        const fetchedData = await fetchHouseById(itemId.value);
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          item.value = fetchedData[0];
        } else {
          console.warn("Empty response from API");
          item.value = null;
        }
      } catch (error) {
        console.error("Error loading data:", error);
        item.value = null;
      } 
    };

    onMounted(loadItem);

    watch(itemId, loadItem);

    return { item };
  },
};
</script>

<template>
  <div class="card-page" v-if="item && item.location">
    <div class="wrapper">
      <router-link class="back-btn" :to="'/'">
        <img
          class="btn-icon-desktop"
          src="../../assets/icons/ic_back_grey@3x.png"
          alt="back-icon"
        />
        <img
          class="btn-icon-mobile"
          src="../../assets/icons/ic_back_white@3x.png"
          alt="back-icon"
        />
        <span class="span-desktop">Back to overview</span>
      </router-link>
      <router-link
        class="edit-btn-mobile"
        v-show="item.id > 11"
        :to="{
          path: '/create',
          query: { id: item.id },
        }"
      >
        <img
          class="btn-icon-mobile"
          src="../../assets/icons/ic_edit_white@3x.png"
          alt="edit-icon"
        />
      </router-link>
      <button
        class="delete-btn-mobile"
        v-show="item.id > 11"
        v-on:click="openModalDelete(item, $event)"
      >
        <img
          class="btn-icon-mobile"
          src="../../assets/icons/ic_delete_white@3x.png"
          alt="delete-icon"
        />
      </button>
      <div class="main">
        <div class="page-description">
          <img class="background" :src="item.image" />
          <div class="container">
            <router-link
              class="edit-btn-desktop"
              v-show="item.id > 11"
              :to="{
                path: '/create',
                query: { id: item.id },
              }"
            >
              <img
                class="btn-icon-desktop"
                src="../../assets/icons/ic_edit@3x.png"
                alt="edit-icon"
              />
            </router-link>
            <button
              class="delete-btn-desktop"
              v-show="item.id > 11"
              v-on:click="openModalDelete(item)"
            >
              <img
                class="btn-icon-desktop"
                src="../../assets/icons/ic_delete@3x.png"
                alt="delete-icon"
              />
            </button>
            <h2 class="title">
              {{ item.location.street + " " + item.location.houseNumber }}
            </h2>
            <div class="characteristic">
              <img src="../../assets/icons/ic_location@3x.png" />
              <span class="span">{{
                item.location.zip + " " + item.location.city
              }}</span>
            </div>
            <div class="characteristics-group">
              <div class="characteristic">
                <img src="../../assets/icons/ic_price@3x.png" />
                <span class="span">{{ item.price }}</span>
              </div>
              <div class="characteristic">
                <img src="../../assets/icons/ic_size@3x.png" />
                <span class="span">{{ formatedSize }}</span>
              </div>
              <div class="characteristic">
                <img src="../../assets/icons/ic_construction_date@3x.png" />
                <span class="span">{{ formatedConstructionYear }}</span>
              </div>
            </div>
            <div class="characteristics-group">
              <div class="characteristic">
                <img src="../../assets/icons/ic_bed@3x.png" />
                <span class="span">{{ item.rooms.bedrooms }}</span>
              </div>
              <div class="characteristic">
                <img src="../../assets/icons/ic_bath@3x.png" />
                <span class="span">{{ item.rooms.bathrooms }}</span>
              </div>
              <div class="characteristic">
                <img src="../../assets/icons/ic_garage@3x.png" />
                <span class="span">{{ hasGarage }}</span>
              </div>
            </div>
            <p class="text">{{ item.description }}</p>
          </div>
        </div>
        <div class="recommendations">
          <h2 class="recommendations-title">Recommended for you</h2>
          <div class="item-list">
            <CardItem
              v-for="(el, index) in randomItems"
              :key="index"
              :item="el"
              :openModalDelete="openModalDelete"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-page {
  padding-bottom: 70px;
  background-color: #f6f6f6;
  height: 100%;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.background {
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
  z-index: 0;
  position: relative;
}

.container {
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  margin-top: -16px;
  z-index: 1;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
}

.page-description {
  width: 100%;
}

.back-btn {
  text-decoration: none;
  color: inherit;
  background-color: transparent;
  border: none;
  position: absolute;
  top: 15px;
  left: 10px;
  cursor: pointer;
  z-index: 1;
}

.span-desktop {
  display: none;
}

.edit-btn-mobile {
  background-color: transparent;
  border: none;
  position: absolute;
  top: 15px;
  right: 40px;
  cursor: pointer;
  z-index: 1;
}

.edit-btn-desktop {
  display: none;
}

.delete-btn-mobile {
  background-color: transparent;
  border: none;
  position: absolute;
  top: 15px;
  right: 10px;
  cursor: pointer;
  z-index: 1;
}

.delete-btn-desktop {
  display: none;
}

.btn-icon-desktop {
  display: none;
}

.btn-icon-mobile {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.title {
  margin: 0;
  font-size: 18px;
  font-family: Montserrat-SemiBold;
}

.characteristics-group {
  display: flex;
  gap: 16px;
}

.characteristic {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 16px;
}

.characteristic img {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.span {
  font-size: 12px;
  font-family: OpenSans-Regular;
  color: #4a4b4c;
}

.text {
  color: #4a4b4c;
  font-size: 12px;
  font-family: OpenSans-Regular;
  margin: 0;
  margin-top: 10px;
}

.recommendations {
  background-color: #f6f6f6;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}

.recommendations-title {
  margin: 0;
  margin-bottom: 20px;
  font-size: 14px;
  font-family: Montserrat-SemiBold;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 1024px) {
  .card-page {
    padding-bottom: 0;
  }

  .wrapper {
    position: relative;
    padding: 40px 20px;
  }

  .main {
    display: flex;
    gap: 50px;
  }

  .background {
    height: 550px;
    width: 100%;
    object-fit: cover;
    z-index: 0;
    position: relative;
  }

  .recommendations {
    padding: 0 20px;
    width: 70%;
  }

  .back-btn {
    position: static;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .span-desktop {
    display: block;
    font-family: Montserrat-SemiBold;
    font-size: 16px;
  }

  .page-description {
    width: 100%;
  }

  .btn-icon-desktop {
    display: block;
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .btn-icon-mobile {
    display: none;
  }

  .edit-btn-desktop {
    display: block;
    background-color: transparent;
    border: none;
    position: absolute;
    top: 15px;
    right: 40px;
    cursor: pointer;
    z-index: 1;
  }

  .edit-btn-mobile {
    display: none;
  }

  .delete-btn-desktop {
    display: block;

    background-color: transparent;
    border: none;
    position: absolute;
    top: 15px;
    right: 10px;
    cursor: pointer;
    z-index: 1;
  }

  .delete-btn-mobile {
    display: none;
  }

  .container {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin-top: -22px;
  }

  .title {
    font-size: 22px;
  }

  .recommendations-title {
    font-size: 20px;
  }

  .span {
    font-size: 16px;
  }

  .text {
    font-size: 16px;
  }
}
</style>
