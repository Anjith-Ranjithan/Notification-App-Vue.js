<template>
      <MainNavbar id="mainNavbar"/>
      <div id="app"></div>
</template>

<script>
import backgroundImage from '@/assets/Background1.jpg'; 
import MainNavbar from './components/MainNavbar.vue';
import '@fortawesome/fontawesome-free/css/all.css';
export default {
  components: {
    MainNavbar,
  },
  data() {
    return {
      backgroundImage,
    };
  },
};

</script>

<style>
body {
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-image: url('./assets/Background1.jpg'); 
  font-family: Arial, sans-serif;
}
</style>
