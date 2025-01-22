<script>
import CardItem from "../CardItem/CardItem.vue";

export default {
  components: {
    CardItem,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    loadData: {
      type: Function,
      required: true,
    },
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    openModalDelete: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      filter: 'price',
      searchQuery: '',
    };
  },
  methods: {
    setFilter(filterName) {
      this.filter = filterName;
    },
    clearInput() {
      this.searchQuery = "";
    },
  },
  computed: {
    sortedItems() {
      if (!this.data) return [];
      return this.data
        .filter((item) => {
          const itemName = `${item?.location?.street || ""} ${item?.location?.houseNumber || ""}`.toLowerCase();
          return itemName.includes(this.searchQuery.toLowerCase());
        })
        .sort((a, b) => {
          if (this.filter === 'price') return b.price - a.price;
          if (this.filter === 'size') return b.size - a.size;
          return 0;
        });
    },
  },
};
</script>

<template>
  <div class="home-page">
    <div class="wrapper">
      <header>
        <h2 class="title">Houses</h2>
        <router-link to="/create" class="add_btn"></router-link>
      </header>
      <main>
        <div class="search-filter">
          <div class="search-input">
            <input
              type="text"
                v-model="searchQuery"
              @input="$emit('update:searchQuery', $event.target.value)"
              placeholder="Search for a house"
            />
            <button
              v-if="searchQuery"
              class="clear-btn"
              v-on:click="clearInput"
            ></button>
          </div>
          <div class="filter-switch">
            <button
              class="filter-button"
              :class="{ active: filter === 'price' }"
              @click="setFilter('price')"
            >
              Price
            </button>
            <button
              class="filter-button"
              :class="{ active: filter === 'size' }"
              @click="setFilter('size')"
            >
              Size
            </button>
          </div>
        </div>
        <div v-if="!sortedItems.length" class="no-items-logo">
          <img
            src="../../assets/icons/img_empty_houses@3x.png"
            alt="empty-houses-logo"
          />
          <span class="no-items-info">No results found.</span>
        </div>
        <div class="item-list">
          <CardItem
            v-for="(item, index) in sortedItems"
            :key="index"
            :item="item"
            :openModalDelete="openModalDelete"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  padding: 20px;
  padding-bottom: 70px;
  height: 100%;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

header {
  display: flex;
  position: relative;
}

.title {
  font-family: Montserrat-Bold;
  font-size: 18px;
  width: max-content;
  margin: 0 auto;
  margin-bottom: 20px;
}

.add_btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 22px;
  height: 22px;
  object-fit: contain;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.add_btn::after {
  content: "";
  background-image: url(../../assets/icons/ic_plus_grey@3x.png);
  position: absolute;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.search-filter {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.clear-btn {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 10px;
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position: center;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  background-image: url(../../assets/icons/ic_clear@3x.png);
}

.filter-switch {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
}

.filter-button {
  flex: 1;
  padding: 8px 20px;
  border: none;
  background-color: #c3c3c3;
  color: #fff;
  font-size: 12px;
  font-family: Montserrat-SemiBold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-button.active {
  background-color: #eb5440;
}

.no-items-logo {
  margin-top: 130px;
  text-align: center;
}

.no-items-logo img {
  height: 30vh;
  margin-bottom: 20px;
}

.no-items-info {
  display: block;
  font-family: Montserrat-Medium;
  font-size: 14px;
  color: #4a4b4c;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input {
  background-image: url(../../assets/icons/ic_search@3x.png);
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position: 10px center;
  padding-left: 40px;
  height: 30px;
  width: 100%;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 12px;
  background-color: #e8e8e8;
  font-family: Open Sans Regular;
}

input:focus {
  border: none;
  outline: none;
}

@media (min-width: 1024px) {
  .home-page {
    padding: 0 20px 40px 20px;
    height: 100%;
  }

  header {
    padding: 40px 0 30px;
    justify-content: space-between;
  }

  .title {
    font-family: Montserrat-SemiBold;
    font-size: 26px;
    margin: 0;
  }

  .add_btn {
    position: relative;
    width: 150px;
    height: 35px;
    border-radius: 4px;
    background-color: #eb5440;
  }

  .add_btn::before {
    content: "CREATE NEW";
    color: white;
    font-family: Montserrat-SemiBold;
    position: absolute;
    top: 9px;
    left: 40px;
    font-size: 14px;
  }

  .add_btn::after {
    background-image: url(../../assets/icons/ic_plus_white@3x.png);
    background-size: contain;
    background-repeat: no-repeat;
    width: 60%;
    height: 60%;
    top: 6px;
    left: -25px;
  }

  .add_btn:hover {
    background-color: #db4b38;
  }

  .search-filter {
    flex-direction: row;
    justify-content: space-between;
  }

  .search-input {
    width: 30%;
  }

  .filter-switch {
    width: 20%;
  }

  .no-items-info {
    font-size: 18px;
  }

  input {
    font-size: 14px;
  }
}
</style>
