import Vue from 'vue'
import App from './App'
import callRequire from './require/require.js'
	import api from './api/api.js';
Vue.config.productionTip = false

Vue.prototype.$callRequire = callRequire

App.mpType = 'app'

// #ifdef H5

import wchat from './commen/js/wchat.js'
// 微信内置浏览器分享
if(wchat.isWechat()){
	Vue.prototype.$wchat = wchat;
}

// #endif
//
// huandongchajian 
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	Vue.component('mescroll-body', MescrollBody)
	Vue.component('mescroll-uni', MescrollUni)	
	

 
Vue.prototype.$eventHub = new Vue();
const app = new Vue({
    ...App
})
app.$mount()
