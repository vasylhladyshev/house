<script>
import Footer from "./components/Footer/Footer.vue";
import HeaderOnDesktop from "./components/HeaderOnDesktop/HeaderOnDesktop.vue";
import Modal from "./components/Modal/Modal.vue";
import { fetchData } from "./services/api";
import { ref,  onMounted, watchEffect } from "vue";

export default {
  components: {
    Footer,
    HeaderOnDesktop,
    Modal,
  },
  setup() {
    const data = ref([]);
    const isModalOpen = ref(false);
    const itemOnDelete = ref(null);
    const item = ref(null);

    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        data.value = fetchedData.slice(1);
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };

    const openModalDelete = (el, event) => {
      event.stopPropagation();
      isModalOpen.value = true;
      itemOnDelete.value = el;
    };

    const closeModalDelete = () => {
      isModalOpen.value = false;
      itemOnDelete.value = null;
    };

    onMounted(() => {
      loadData();
    });

    return {
      data,
      isModalOpen,
      itemOnDelete,
      item,
      openModalDelete,
      closeModalDelete,
      loadData,
    };
  },
};
</script>

<template>
  <HeaderOnDesktop />

  <RouterView v-slot="{ Component }">
    <component
      :is="Component"
      :openModalDelete="openModalDelete"
      :loadData="loadData"
      :data="data"
      :isModalOpen="isModalOpen"
      :item="item"
    />
  </RouterView>

  <Modal
    v-if="isModalOpen"
    :itemOnDelete="itemOnDelete"
    :closeModalDelete="closeModalDelete"
    :loadData="loadData"
  />

  <Footer />
</template>
