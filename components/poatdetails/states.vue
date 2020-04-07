<template>
	<view>
		<!-- #ifndef H5 -->
		<view :class="Fix ? 'states' : 'statesAb'" :style="{'top': top, 'margin-top': marT,}" ref="states">
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view :class="Fix ? 'states' : 'statesAb'" :style="{'top': top}" ref="states">
		<!-- #endif -->
			<view class="states1">{{label}}</view>
			<view class="states2" v-if="reason != ''">{{reason}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["top", "label", "reason", "marT", "Fix"],
		data() {
			return {
				stateH: '',
			}
		},
		onReady() {
			// #ifndef H5
			var that = this
			if(this.Fix) {
				var pst = uni.createSelectorQuery().in(this).select('.states')
			}else {
				var pst = uni.createSelectorQuery().in(this).select('.statesAb')
			}
			pst.boundingClientRect(data => {
				that.stateH = data.height
				that.sendH()
			}).exec();
			// #endif
		},
		mounted() {
			var that = this
			// #ifdef H5
			that.stateH = that.$refs.states.$el.offsetHeight
			that.sendH()
			// #endif
		},
		methods:{
			sendH() {
				this.$emit('statesHeight', this.stateH)
			}
		},
	}
</script>

<style scoped="scoped">
	.states{position: fixed;left: 0;right: 0;background: #FFE5CC;font-size: 28upx;color: #FD7F00;top: 0;height: auto;text-align: center;z-index: 2;padding: 12upx;}
	.states2{font-size: 32upx;margin-top: 8upx;}
	.statesAb{background: #FFE5CC;font-size: 28upx;color: #FD7F00;top: 0;height: auto;text-align: center;padding: 12upx;}
</style>
