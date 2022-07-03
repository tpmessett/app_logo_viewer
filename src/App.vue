<template>
  <div id="content">
    <h1>App Icon Preview:</h1>
    <h4>When building an app changing the app logo can be a bit of a slow process as it requires a new build of the app for each change. So this simple tool allows you to see a preview without the need to run a whole build on android or iOS. Just upload your logo and see how it will look:</h4>
    <div>
      <img id="main-image" class="main-icon" v-if="image" v-bind:src="image" />
      <p>{{text}}</p>
      <div class="warn" v-if="image && notSquare">
        <p>Your logo is {{imgWidth}}px x {{imgHeight}}px. App logos should be square and 1024px x 1024px.</p>
        <p>White padding will automatically be added to your image to make it appear as it would if squared off before upload to app stores.</p>
      </div>
    </div>
    <form>
      <div class="input">
        <label for="file">Upload Icon</label>
        <input ref="file" @change="handleFileUpload()"  type="file" id="file">
      </div>
      <div class="input">
        <label for="name">Input your App name</label>
        <input v-on:keyup="textMaker()" v-model="text" placeholder="Enter App Name" id="name">
      </div>
    </form>
    <div class="devices">
      <div class="iphone phone">
        <div class="icon-iphone">
          <img class="iconi" v-if="image" v-bind:src="image"/>
        </div>
        <div class="app-name-iphone">{{iphonetext}}</div>
      </div>
      <div class="android phone">
        <div class="icon-android">
            <img class="icona" v-if="image" v-bind:src="image"/>
        </div>
        <div class="app-name-android">{{text}}</div>
      </div>
    </div>
  </div>
  <div class="footer">
      <p id="footer-text">Made by <a target="_blank" href="https://github.com/tpmessett">Tom Messett</a>, looking for an app? <a href="mailto:tom@slerp.com">Get in touch!</a></p>
    </div>
</template>

<script>
import { ref } from 'vue'
export default ({
  name: 'App Logo Viewer',
  setup() {
    const text = ref('')
    const iphonetext = ref('')
    const imgWidth = ref(0)
    const imgHeight = ref(0)
    const notSquare = ref(false)
    const textMaker = () => {
      console.log(text.value.length)
      if(text.value.length > 10){
        iphonetext.value = text.value.replace(/\s/g, "")
        if (iphonetext.value.length > 12) {
          const end = "..."
          const text = iphonetext.value.substring(0, 12)
          iphonetext.value = text + end
        }
      } else {
        iphonetext.value = text.value
      }
    }
    const image = localStorage.getItem('imageKey')

    const handleFileUpload = async() => {
      const file = document.querySelector('input[type=file]').files[0]
      const reader = new FileReader()
      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        localStorage.setItem("imageKey", rawImg)
      }
      reader.readAsDataURL(file);
      location.reload();
    }

    const img = new Image();

    img.src = localStorage.getItem('imageKey');

    img.onload = function() {
      imgWidth.value = img.naturalWidth;
      imgHeight.value = img.naturalHeight;
      if (img.naturalWidth != img.naturalHeight) {
        notSquare.value = true
      }
    };
    return {
      handleFileUpload,
      image,
      text,
      iphonetext,
      textMaker,
      imgHeight,
      imgWidth,
      notSquare
    };
  }
});

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gelasio&family=Inter:wght@300;400&family=Roboto:wght@400;500&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
p {
  font-size: 12px;
}

body {
  margin: 0;
}

h4 {
  max-width: 50%;
  margin: auto;
  padding-bottom: 12px;
}
#file {
  width: 30%;
  margin:  auto;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin: auto;
}
label {
  padding-right: 16px;
  font-size: 12px;
}
.warn {
  color: red;
}
.input {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.main-icon {
  max-height: 20%;
  max-width:  20%;
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
  width: 46px;
  height: 46px;
  position: relative;
  bottom:  -578px;
  right: -260px;
  border-radius: 50%;
  text-align:  center;
  overflow: hidden;
  box-shadow: 0 0 3px #ccc;
}

.devices {
  display: flex;
  justify-content: space-around;
  padding: 16px;
  margin-bottom: 24px;
}

#content {
  min-height: calc(100vh - 49px);
}
.footer {
  height: auto;
  padding: 12px 0;
  text-align: center;
  color: white;
  background-color: #474448;
  width: 100%;
  }

#footer-text {
  font-size: 14px;
}

a {
  color: white;
}

.iphone {
  font-family: 'inter', sans-serif;
  background-image: url(./assets/iphone.png);
  margin: 16px;
  display: block;
  width: 326px;
  height: 723px;
  background-repeat: no-repeat;
  background-position: center;
}

.android {
  font-family: 'roboto', sans-serif;
  background-image: url(./assets/pixel.png);
  margin: 16px;
  display: block;
  width: 326px;
  height: 723px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.app-name-android {
  color: #a3a3a3;
  font-size: 10px;
  position: relative;
  bottom:  -585px;
  right: -259px;
  font-weight: 500;
  width: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-name-iphone {
  color: white;
  position: relative;
  bottom:  -494px;
  left: 13px;
  font-size: 10px;
  width: 68px;
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
    max-height:40px;
    max-width:40px;

    height:auto;
    width:auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

@media only screen and (max-width: 702px) {
  .devices {
    flex-direction: column;
    justify-content:  center;
  }
  .main-icon {
  max-height: 50%;
  max-width:  50%;
}
}

@media only screen and (max-width: 600px) {
  .phone {
    margin:  16px 0 !important;
    width: 100%;
    marign: auto;
  }
  #file {
    width: 100%
  }
  h4 {
    max-width: 90%;
  }
  .devices {
    justify-content: center;
  }
  .icon-android {
    bottom: -594px;
    right: -277px;
  }
  .icon-iphone {
    left: 32px;
  }
  .app-name-iphone {
    left: 23px;
  }
  .app-name-android {
    bottom: -601px;
    right: -275px;
  }
}
</style>
