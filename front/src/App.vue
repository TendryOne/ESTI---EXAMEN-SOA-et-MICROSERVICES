<script setup lang="ts">

</script>

<template>

  <header>
    <nav>
      <h2>Entreprise</h2>
      <div class="nav-cont">
        <p>Conseiller RH</p>
        <div class="image-container">

        </div>
      </div>
    </nav>
  </header>
  <div class="body-container">
    <RouterView></RouterView>
  </div>

</template>

<style scoped>
nav {
  color: rgb(16, 91, 101);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, .1), 0px 8px 16px rgba(0, 0, 0, .1);
}

.nav-cont {
  display: flex;
  align-items: center;
}

.nav-cont p {
  color: #000;
  font-weight: bold;
}

.image-container {
  width: 25px;
  height: 25px;
  background: #000;
  border-radius: 100%;
  margin-left: 10px;


}

.body-container {
  height: 93.3vh;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>
