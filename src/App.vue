<template>
  <h1>App Icon Preview:</h1>
  <img class="main-icon" v-if="image" v-bind:src="image" />
  {{text}}
  <form>
    <input ref="file" @change="handleFileUpload()"  type="file">
    <input v-model="text" placeholder="Enter App Name">
  </form>
  <div class="devices">
    <div class="iphone phone">
      <div class="icon-iphone">
        <img class="iconi" v-if="image" v-bind:src="image"/>
      </div>
    </div>
    <div class="android phone">
      <div class="icon-android">
          <img class="icona" v-if="image" v-bind:src="image"/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default ({
  setup() {
    const text = ref('')
    const image = localStorage.getItem('imageKey')
    const handleFileUpload = async() => {
      const file = document.querySelector('input[type=file]').files[0]
      const reader = new FileReader()
      let rawImg;
      reader.onloadend = () => {
         rawImg = reader.result;
         console.log(rawImg);
         localStorage.setItem("imageKey", rawImg)
      }
      reader.readAsDataURL(file);
      console.log(file)
      console.log(image)
      console.log(image.value)
      location.reload();
    }
    return {
      handleFileUpload,
      image,
      text
    };
  }
});

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main-icon {
  max-height: 50%;
  max-width:  50%;
}
.icon-iphone {
  background-color: white;
  width: 50px;
  height: 50px;
  position: relative;
  bottom:  -490px;
  left: 22px;
  border-radius: 20%;
  text-align:  center;
  overflow: hidden;
}

.icon-android {
  background-color: white;
  width: 42px;
  height: 42px;
  position: relative;
  bottom:  -580px;
  right: -263px;
  border-radius: 50%;
  text-align:  center;
  overflow: hidden;
  box-shadow: 0 0 3px #ccc;
}

.devices {
  display: flex;
  justify-content: space-around;
  padding: 16px;
}

.iphone {
  background-image: url(./assets/iphone.png);
  margin: 16px;
  display: block;
  width: 326px;
  height: 723px;
  background-repeat: no-repeat;
  background-position: center;
}

.android {
  background-image: url(./assets/pixel.png);
  margin: 16px;
  display: block;
  width: 326px;
  height: 723px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.iconi{
    max-height:50px;
    max-width:50px;
    height:auto;
    width:auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.icona{
    max-height:38px;
    max-width:38px;

    height:auto;
    width:auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

@media only screen and (max-width: 992px) {
  .devices {
    flex-direction: column;
    justify-content:  center;
  }
}
</style>
