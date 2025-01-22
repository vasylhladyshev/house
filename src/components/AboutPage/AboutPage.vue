<script></script>

<template>
  <div class="about-page">
    <div class="wrapper">
      <header class="about-title">About</header>
      <span class="description-title">About DTT Real Estate</span>
      <p class="text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <span class="description-title">Design and Development</span>
      <div class="logo">
        <img src="../../assets/icons/img_logo_dtt@3x.png" alt="logo" />
        <div class="logo-info">
          <span class="info-span"> By DTT </span>
          <a class="info-link" href="https://www.d-tt.nl/">www.d-tt.nl</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  background-color: #f6f6f6;
  padding: 20px;
  height: 92vh;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.about-title {
  font-family: Montserrat-Bold;
  font-size: 18px;
  width: max-content;
  margin: 0 auto;
  margin-bottom: 20px;
}

.description-title {
  font-size: 14px;
  font-family: Montserrat-Bold;
  margin-bottom: 12px;
  display: block;
}

.text {
  font-family: OpenSans-Regular;
  font-size: 12px;
  color: #4a4b4c;
  margin: 0;
  margin-bottom: 12px;
}

.logo {
  display: flex;
  gap: 16px;
}

.logo img {
  width: 30%;
  object-fit: contain;
}

.logo-info {
  display: flex;
  flex-direction: column;
}

.info-span {
  font-size: 10px;
  font-family: OpenSans-Regular;
  color: #4a4b4c;
}

.info-link {
  font-size: 8px;
  text-decoration: none;
  color: #067bc2;
  font-family: OpenSans-Regular;
}

@media (min-width: 1024px) {
  .about-title {
    display: none;
  }

  .description-title {
    font-size: 22px;
    margin-bottom: 22px;
  }

  .text {
    font-size: 18px;
    margin-bottom: 22px;
  }

  .logo {
    align-items: center;
  }

  .logo img {
    width: 25%;
  }

  .info-span {
    font-size: 18px;
  }

  .info-link {
    font-size: 16px;
  }
}
</style>
