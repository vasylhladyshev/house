<script>
import router from "@/router/router";
import {
  fetchHouseById,
  submitHouseForm,
  uploadHouseImage,
} from "@/services/api";
import { validateField } from "@/services/validation";

export default {
  data() {
    return {
      previewUrl: null,
      imageFile: null,
      isMenuOpen: false,
      priceValue: "",
      formErrors: {},
      formData: {
        price: "",
        rooms: {
          bedrooms: "",
          bathrooms: "",
        },
        location: {
          street: "",
          houseNumber: "",
          houseNumberAddition: "",
          zip: "",
          city: "",
        },
        size: "",
        constructionYear: "",
        hasGarage: true,
        description: "",
      },
    };
  },
  props: {
    loadData: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.previewUrl = URL.createObjectURL(file);
        this.imageFile = file;
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    deleteImage() {
      this.previewUrl = null;
      this.imageFile = null;
      this.$refs.fileInput.value = "";
    },
    toggleDown() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleOutsideClick(event) {
      const dropdown = this.$refs.dropdown;
      if (dropdown && !dropdown.contains(event.target)) {
        this.isMenuOpen = false;
      }
    },
    selectOption(option) {
      this.formData.hasGarage = option === "Yes";
    },

    async loadEditingItem(id) {
      try {
        const result = await fetchHouseById(id);
        this.formData = { ...result[0] };
        this.previewUrl = result[0].image || null;
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },

    async submitForm(event) {
      event.preventDefault();

      const formDataToSend = new FormData();
      formDataToSend.append("price", this.formData.price);
      formDataToSend.append("bedrooms", this.formData.rooms.bedrooms);
      formDataToSend.append("bathrooms", this.formData.rooms.bathrooms);
      formDataToSend.append("size", this.formData.size);
      formDataToSend.append("streetName", this.formData.location.street);
      formDataToSend.append("houseNumber", this.formData.location.houseNumber);
      formDataToSend.append(
        "numberAddition",
        this.formData.location.houseNumberAddition
      );
      formDataToSend.append("zip", this.formData.location.zip);
      formDataToSend.append("city", this.formData.location.city);
      formDataToSend.append("constructionYear", this.formData.constructionYear);
      formDataToSend.append("hasGarage", this.formData.hasGarage);
      formDataToSend.append("description", this.formData.description || "");

      let result = null;

      try {
        if (this.$route.query.id) {
          await submitHouseForm(formDataToSend, { id: this.$route.query.id });
          result = await fetchHouseById(this.$route.query.id);
        } else {
          result = await submitHouseForm(formDataToSend, null);
        }

        if (Array.isArray(result) && result.length > 0) {
          result = result[0];
        }

        if (result && result.id && this.imageFile) {
          await uploadHouseImage(result.id, this.imageFile);
          result = await fetchHouseById(result.id);

          if (Array.isArray(result) && result.length > 0) {
            result = result[0];
          }
        }

        if (!result || !result.location) {
          console.error("Error: received invalid result object", result);
          return;
        }

        await this.loadData();
        router.push(`/card/${result.id}`);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },

    validateField(name) {
    const errors = validateField(name, this.formData);
    this.formErrors = { ...this.formErrors, ...errors };
  },

    clearErrorOnInput(name) {
      this.formErrors = { ...this.formErrors };
      delete this.formErrors[name];
    },
  },

  computed: {
    formattedPrice: {
      get() {
        return this.formData.price ? `€${this.formData.price}` : "";
      },
      set(value) {
        const numericValue = value.replace("€", "").trim();
        this.formData.price = numericValue ? parseFloat(numericValue) : null;
      },
    },
    formatedSize: {
      get() {
        return this.formData.size ? `${this.formData.size} m2` : "";
      },
      set(value) {
        const numericValue = value.replace(" m2", "");
        this.formData.size = numericValue ? parseFloat(numericValue) : null;
      },
    },
    isFormValid() {
      return (
        !Object.values(this.formErrors).some((error) => error) &&
        this.formData.price &&
        this.formData.rooms.bedrooms &&
        this.formData.rooms.bathrooms &&
        this.formData.location.street &&
        this.formData.location.houseNumber &&
        this.formData.location.zip &&
        this.formData.location.city &&
        this.formData.size &&
        this.formData.constructionYear &&
        this.formData.description &&
        this.previewUrl
      );
    },
  },
  mounted() {
    const itemId = this.$route.query.id;
    if (itemId) {
      this.loadEditingItem(itemId);
    }
    document.addEventListener("mousedown", this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  },
};
</script>

<template>
  <div class="create-page">
    <div class="wrapper">
      <div class="container">
        <header>
          <div class="btn-div">
            <router-link to="/" class="back-btn">
              <img
                src="../../assets/icons/ic_back_grey@3x.png"
                alt="back-icon"
              />

              <span class="btn-span">Back to overview</span>
            </router-link>
          </div>
          <h2 v-if="$route.query.id" class="title">Edit listing</h2>
          <h2 v-else class="title">Create new listing</h2>
        </header>
        <form>
          <div class="input-div">
            <label for="name">Street name*</label>
            <input
              type="text"
              id="name"
              v-model="formData.location.street"
              placeholder="Enter the street name"
              @blur="validateField('street')"
              @input="clearErrorOnInput('street')"
              :class="{ 'error-input': formErrors.street }"
            />
            <p v-if="formErrors.street" class="error">
              {{ formErrors.street }}
            </p>
          </div>
          <div class="double-input">
            <div class="input-div">
              <label for="number">House number*</label>
              <input
                type="text"
                id="number"
                v-model="formData.location.houseNumber"
                placeholder="Enter house number"
                @blur="validateField('houseNumber')"
                @input="clearErrorOnInput('houseNumber')"
                :class="{ 'error-input': formErrors.houseNumber }"
              />
              <p v-if="formErrors.houseNumber" class="error">
                {{ formErrors.houseNumber }}
              </p>
            </div>
            <div class="input-div">
              <label for="add-number">Additional (optional)</label>
              <input
                v-model="formData.location.houseNumberAddition"
                type="text"
                id="add-number"
                placeholder="e.g.A"
              />
            </div>
          </div>
          <div class="input-div">
            <label for="postal-code">Postal code*</label>
            <input
              type="text"
              id="postal-code"
              v-model="formData.location.zip"
              placeholder="e.g. 1000 AA"
              @blur="validateField('zip')"
              @input="clearErrorOnInput('zip')"
              :class="{ 'error-input': formErrors.zip }"
            />
            <p v-if="formErrors.zip" class="error">{{ formErrors.zip }}</p>
          </div>

          <div class="input-div">
            <label for="city">City*</label>
            <input
              type="text"
              id="city"
              v-model="formData.location.city"
              placeholder="e.g. Utrecht"
              @blur="validateField('city')"
              @input="clearErrorOnInput('city')"
              :class="{ 'error-input': formErrors.city }"
            />
            <p v-if="formErrors.city" class="error">{{ formErrors.city }}</p>
          </div>

          <div class="input-file-div">
            <p class="upload-title">Upload picture (PNG or JPG)*</p>
            <button
              v-if="previewUrl"
              type="button"
              class="delete-btn"
              v-on:click="deleteImage"
            ></button>
            <div class="upload-box" @click="triggerFileInput">
              <img
                v-if="previewUrl"
                :src="previewUrl"
                alt="Uploaded image preview"
                class="preview-image"
              />
              <span v-else class="plus-sign">+</span>

              <input
                id="file-input"
                ref="fileInput"
                type="file"
                @change="onFileChange"
                @blur="validateField('image')"
                accept="image/png, image/jpeg"
              />
            </div>
            <p v-if="formErrors.image" class="error">{{ formErrors.image }}</p>
          </div>

          <div class="input-div">
            <label for="price">Price*</label>
            <input
              type="text"
              id="price"
              v-model="formattedPrice"
              placeholder="e.g. €150.000"
              @blur="validateField('price')"
              @input="clearErrorOnInput('price')"
              :class="{ 'error-input': formErrors.price }"
            />
            <p v-if="formErrors.price" class="error">{{ formErrors.price }}</p>
          </div>

          <div class="double-input">
            <div class="input-div">
              <label for="size">Size*</label>
              <input
                type="text"
                id="size"
                v-model="formatedSize"
                placeholder="e.g. 60m2"
                @blur="validateField('size')"
                @input="clearErrorOnInput('size')"
                :class="{ 'error-input': formErrors.size }"
              />
              <p v-if="formErrors.size" class="error">{{ formErrors.size }}</p>
            </div>

            <div class="input-div">
              <label>Garage*</label>
              <div class="select-div" ref="dropdown" @click="toggleDown">
                <span class="input-value">{{
                  formData.hasGarage ? "Yes" : "No"
                }}</span>
                <div class="options" v-show="isMenuOpen">
                  <span class="option" v-on:click="selectOption('Yes')"
                    >Yes</span
                  >
                  <span class="option" v-on:click="selectOption('No')">No</span>
                </div>
              </div>
            </div>
          </div>
          <div class="double-input">
            <div class="input-div">
              <label for="bedrooms">Bedrooms*</label>
              <input
                type="text"
                id="bedrooms"
                v-model="formData.rooms.bedrooms"
                placeholder="Enter amount"
                @blur="validateField('bedrooms')"
                @input="clearErrorOnInput('bedrooms')"
                :class="{ 'error-input': formErrors.bedrooms }"
              />
              <p v-if="formErrors.bedrooms" class="error">
                {{ formErrors.bedrooms }}
              </p>
            </div>

            <div class="input-div">
              <label for="bathrooms">Bathrooms*</label>
              <input
                type="text"
                id="bathrooms"
                v-model="formData.rooms.bathrooms"
                placeholder="Enter amount"
                @blur="validateField('bathrooms')"
                @input="clearErrorOnInput('bathrooms')"
                :class="{ 'error-input': formErrors.bathrooms }"
              />
              <p v-if="formErrors.bathrooms" class="error">
                {{ formErrors.bathrooms }}
              </p>
            </div>
          </div>
          <div class="input-div">
            <label for="date">Construction date*</label>
            <input
              type="text"
              id="date"
              v-model="formData.constructionYear"
              placeholder="e.g. 1990"
              @blur="validateField('constructionYear')"
              @input="clearErrorOnInput('constructionYear')"
              :class="{ 'error-input': formErrors.constructionYear }"
            />
            <p v-if="formErrors.constructionYear" class="error">
              {{ formErrors.constructionYear }}
            </p>
          </div>

          <div class="input-div">
            <label for="description">Description*</label>
            <textarea
              id="description"
              v-model="formData.description"
              placeholder="Enter description"
              @blur="validateField('description')"
              @input="clearErrorOnInput('description')"
              :class="{ 'error-input': formErrors.description }"
            ></textarea>
            <p v-if="formErrors.description" class="error">
              {{ formErrors.description }}
            </p>
          </div>

          <button
            v-if="$route.query.id"
            class="bot-btn"
            v-on:click="submitForm"
            :disabled="!isFormValid"
          >
            SAVE
          </button>
          <button
            v-else
            class="bot-btn"
            v-on:click="submitForm"
            :disabled="!isFormValid"
          >
            POST
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-page {
  background: url(../../assets/icons/img_background@3x.png);
  background-size: cover;
  height: 100%;
  position: relative;
  padding: 20px;
  padding-bottom: 50px;
  box-sizing: border-box;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.back-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  top: 20px;
}

.back-btn img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.btn-span {
  display: none;
}

.title {
  font-family: Montserrat-Bold;
  font-size: 18px;
  width: max-content;
  margin: 0 auto;
  margin-bottom: 15px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-file-div {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.upload-title {
  font-size: 12px;
  font-family: Montserrat-SemiBold;
  color: #4a4b4c;
}

.upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border: 2px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.upload-box:hover {
  border-color: #007bff;
}

.plus-sign {
  font-size: 36px;
  color: #888;
  pointer-events: none;
}

.delete-btn {
  position: absolute;
  top: 43px;
  left: 105px;
  width: 25px;
  height: 25px;
  z-index: 1;
  background: url(../../assets/icons/ic_clear_white@3x.png);
  background-size: contain;
  border: none;
  cursor: pointer;
}

input[type="file"] {
  display: none;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.input-div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

#description {
  height: 100px;
  border-color: transparent;
  border-radius: 4px;
  padding: 10px;
  font-size: 12px;
  font-family: OpenSans-Regular;
  color: #4a4b4c;
  resize: none;
}

label {
  font-size: 12px;
  font-family: Montserrat-SemiBold;
  color: #4a4b4c;
}

input {
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 12px;
  font-family: OpenSans-Regular;
  color: #4a4b4c;
}

.double-input {
  display: flex;
  gap: 8px;
}

.double-input .input-div {
  width: 50%;
}

.select-div {
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 12px;
  font-family: OpenSans-Regular;
  color: #4a4b4c;
  background-color: white;
  position: relative;
  cursor: pointer;
}

.input-value::after {
  content: "";
  position: absolute;
  top: 6px;
  right: 10px;
  width: 25px;
  height: 25px;
  background-size: contain;
  background-image: url(../../assets/icons/arrows.jpg);
}

.options {
  border: none;
  width: 100%;
  position: absolute;
  top: 40px;
  left: 0;
  display: flex;
  flex-direction: column;
}

.option {
  cursor: pointer;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  font-family: OpenSans-Regular;
  color: #4a4b4c;
  background-color: white;
}

.bot-btn {
  margin: 20px 0;
  padding: 10px;
  background-color: #eb5440;
  border: none;
  border-radius: 4px;
  color: white;
  font-family: Montserrat-SemiBold;
  cursor: pointer;
}

.bot-btn:hover {
  background-color: #db4b38;
}

.bot-btn:disabled {
  cursor: not-allowed;
  background-color: #dd7669;
}

.error {
  font-size: 12px;
  font-family: Montserrat-MediumItalic;
  color: #eb5440;
}

.error-input {
  border: 1px solid red !important;
  outline: none;
}

@media (min-width: 1024px) {
  .create-page {
    padding-bottom: 0;
  }

  header {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    gap: 16px;
  }

  .container {
    max-width: 400px;
  }

  .back-btn {
    position: static;
    width: 25px;
  }

  .btn-div {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .btn-span {
    display: block;
    font-size: 14px;
    font-family: Montserrat-SemiBold;
    cursor: pointer;
  }

  .title {
    display: block;
    margin: 0;
    font-size: 20px;
  }

  label {
    font-size: 14px;
  }

  input {
    font-size: 14px;
  }

  .error {
    font-size: 14px;
  }
}
</style>
