<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    openCardPage: {
      type: Function,
      required: true,
    },
    createCard: {
      type: Function,
      required: true,
    },
    openModalDelete: {
      type: Function,
      required: true,
    }
  },
  computed: {
    formatedSize: {
      get() {
        return this.item.size + " m2";
      },
    },
  },
};
</script>

<template>
  <div class="card-item">
    <img
      class="main-img"
      :src="item.image"
      alt="house-img"
      v-on:click="() => openCardPage(item)"
    />
    <div class="card-info">
      <div class="card-header">
        <span class="title" v-on:click="() => openCardPage(item)">{{
          item.location.street + " " + item.location.houseNumber
        }}</span>
        <div class="buttons">
          <button class="card-btn" v-show="item.id>11" v-on:click="() => createCard(item)">
            <img src="../../assets/icons/ic_edit@3x.png" alt="edit-icon" />
          </button>
          <button class="card-btn" v-show="item.id>11" v-on:click="() => openModalDelete(item)">
            <img src="../../assets/icons/ic_delete@3x.png" alt="delete-icon" />
          </button>
        </div>
      </div>
      <span class="price">€ {{ item.price }}</span>
      <span class="address">{{
        item.location.zip + " " + item.location.city
      }}</span>
      <div class="characteristics-group">
        <div class="characteristic">
          <img src="../../assets/icons/ic_bed@3x.png" alt="bed-icon" />
          <span class="span">{{ item.rooms.bedrooms }}</span>
        </div>
        <div class="characteristic">
          <img src="../../assets/icons/ic_bath@3x.png" alt="bath-icon" />
          <span class="span">{{ item.rooms.bathrooms }}</span>
        </div>
        <div class="characteristic">
          <img src="../../assets/icons/ic_size@3x.png" alt="size-icon" />
          <span class="span">{{ formatedSize }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-item {
  background-color: white;
  border-radius: 4px;
  padding: 12px 8px;
  display: flex;
  gap: 10px;
}
.main-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
}

.card-info {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
}

.title {
  font-family: Montserrat-Bold;
  cursor: pointer;
  font-size: 12px;
}

.card-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 1;
}

.card-btn img {
  width: 12px;
  height: 12px;
}

.price {
  font-size: 12px;
  font-family: OpenSans-Regular;
  margin-bottom: 2px;
}

.address {
  color: #4a4b4c;
  font-family: OpenSans-Regular;
  font-size: 12px;
  margin-bottom: 8px;
}

.characteristics-group {
  display: flex;
  gap: 10px;
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
  color: #4a4b4c;
  font-size: 12px;
  font-family: OpenSans-Regular;
}

@media (min-width: 1024px) {
  .card-item {
    gap: 20px;
    padding: 20px;
  }
  .main-img {
    width: 120px;
    height: 120px;
  }
  .card-btn {
    opacity: 0;
  }

  .card-item:hover .card-btn {
    opacity: 1;
  }

  .title {
    font-size: 16px;
    margin-bottom: 12px;
  }

  .price {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .address {
    font-size: 16px;
    margin-bottom: 12px;
  }

  .span {
    font-size: 16px;
  }

  .card-btn img {
    width: 18px;
    height: 18px;
  }
}
</style>
