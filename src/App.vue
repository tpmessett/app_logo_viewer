<template>
  <h1>App Icon Preview:</h1>
  <img v-bind:src="image" />
  <form>
  <input ref="file" @change="handleFileUpload()"  type="file">
</form>
  <div class="devices">
    <div class="iphone phone">
    </div>
    <div class="samsung phone">
    </div>
  </div>
</template>

<script>

export default ({

  setup() {
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

    }

    const image = localStorage.getItem('imageKey')
    return {
      handleFileUpload,
      image
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

.devices {
  display: flex;
  justify-content: space-around;
  padding: 16px;
}

.iphone {
  background-image: url(./assets/iphone.png);
  margin: 16px;
}

.samsung {
  background-image: url(./assets/samsung.png);
  margin: 16px;

}

.phone {
  display: block;
  width: 326px;
  height: 723px;
  background-repeat: no-repeat;
  background-position: center;
}

@media only screen and (max-width: 992px) {
  .devices {
    flex-direction: column;
    justify-content:  center;
  }
}
</style>
