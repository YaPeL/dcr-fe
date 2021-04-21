import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource';
import * as VueGoogleMaps from 'vue2-google-maps'

console.log(process.env)
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueGoogleMaps, {
        load: {
        key: process.env.VUE_APP_GMAP_API_KEY
        },
        installComponents:false
    }
)

Vue.component('gmap-map', VueGoogleMaps.Map)
Vue.component('gmap-marker', VueGoogleMaps.Marker)
Vue.component('gmap-info-window', VueGoogleMaps.InfoWindow)
      

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
