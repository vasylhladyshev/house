<script>
import { deletePostById } from "@/services/api";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  props: {
    itemOnDelete: {
      type: Object,
      required: true,
    },
    closeModalDelete: {
      type: Function,
      required: true,
    },
    loadData: {
      type: Function,
      required: true,
    },
  },

  methods: {
    handleOutsideClick(event) {
      const modal = this.$refs.modalContent;
      if (modal && !modal.contains(event.target)) {
        this.closeModalDelete();
      }
    },
  },

  setup(props) {
    const router = useRouter();
    const modalContent = ref(null);

    const deletePost = async () => {
      try {
        await deletePostById(props.itemOnDelete.id);
        await props.loadData();
        props.closeModalDelete();
        router.push("/");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    };

    const handleOutsideClick = (event) => {
      if (modalContent.value && !modalContent.value.contains(event.target)) {
        props.closeModalDelete();
      }
    };

    onMounted(() => {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleOutsideClick);
    });

    onBeforeUnmount(() => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
    });

    return {
      deletePost,
      modalContent,
    };
  },
};
</script>

<template>
  <div class="modal">
    <div class="modal-content" ref="modalContent">
      <h2 class="title">Delete listing</h2>
      <div class="info">
        <span class="text">Are you sure you want to delete this listing?</span>
        <span class="text">This action cannot be undone.</span>
      </div>
      <div class="buttons">
        <button class="delete-btn" v-on:click="deletePost">YES, DELETE</button>
        <button class="back-btn" v-on:click="closeModalDelete">GO BACK</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding: 0 30px;
  box-sizing: border-box;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  position: relative;
  padding: 30px 60px;
  max-width: 450px;
}

.title {
  margin: 0;
  font-family: Montserrat-SemiBold;
  font-size: 16px;
}

.info {
  display: flex;
  flex-direction: column;
}

.text {
  font-family: OpenSans-Regular;
  font-size: 12px;
  color: #4a4b4c;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}

.delete-btn {
  background-color: #eb5440;
  border-radius: 4px;
  border: none;
  color: white;
  font-family: Montserrat-SemiBold;
  font-size: 14px;
  padding: 8px 0;
  width: 60%;
  cursor: pointer;
}

.back-btn {
  background-color: #4a4b4c;
  border-radius: 4px;
  border: none;
  color: white;
  font-family: Montserrat-SemiBold;
  font-size: 14px;
  padding: 8px 0;
  width: 60%;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .title {
    font-size: 20px;
  }
  .text {
    font-size: 16px;
  }
  .delete-btn {
    font-size: 18px;
  }

  .back-btn {
    font-size: 18px;
  }
}
</style>
