<template>
	<view class="pulldown-refresher">
		<swiper class="pulldown" vertical @touchend="touchend" @transition="transition">
			<swiper-item class="pulldown-item" :style="{ top: pulldownRefreshingTop + 'px',}">
				<slot></slot>
			</swiper-item>
		</swiper>
		<view class="pulldown-text" :style="{
				minHeight: pullDownRefreshDistance + 'px',
				height: (pulldownRefreshing ? (-pulldownRefresh - pullDownRefreshDistance > 0 ? -pulldownRefresh : pullDownRefreshDistance) : -pulldownRefresh) + 'px',
				opacity: pulldownRefreshing ? 1 : pulldownRefreshingTop ? pulldownRefreshingTop / pullDownRefreshDistance : -pulldownRefresh / pullDownRefreshDistance
			}">{{ -pulldownRefresh > pullDownRefreshDistance + 40 ? '' : (pulldownRefreshing ? '... 刷新中 ...' : '... 继续下拉刷新列表 ...') }}</view>
		<!-- ... 松开手指刷新列表 ... -->
		<view class="pullup-text" :style="{
					minHeight: pullupRefreshDistance + 'px',
					height: (pullupRefreshing ? (pullupRefresh - pullupRefreshDistance > 0 ? pullupRefresh : pullupRefreshDistance) : -pullupRefresh) + 'px',
					opacity: pullupRefreshing ? 1 : pullupRefreshingTop ? pullupRefreshingTop / pullupRefreshDistance : pullupRefresh / pullupRefreshDistance
				}">{{ pullupRefresh > pullupRefreshDistance + 40 ? '' : (-pullupRefreshing ? '... 加载中 ...' : '... 继续上拉刷新列表 ...') }}</view>
	</view>

	<!-- ... 松开手指刷新列表 ... -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pulldownRefresh: 0, // 下拉刷新容器距离顶部的距离
				pullDownStopDistance: 0, //手指松开时下拉刷新容器距离顶部的距离
				pulldownRefreshingTop: 0, //手指松开后下拉刷新容器距离顶部的距离 
				pulldownRefreshing: false, // 页面是否正处于下拉刷新状态
				pullDownRefreshDistance: 60, // 下拉刷新距离
				// 
				pullupRefresh: 0, // 下拉刷新容器距离顶部的距离
				pullupStopDistance: 0, //手指松开时下拉刷新容器距离顶部的距离
				pullupRefreshingTop: 0, //手指松开后下拉刷新容器距离顶部的距离
				pullupRefreshing: false, // 页面是否正处于下拉刷新状态
				pullupRefreshDistance: 60, // 下拉刷新距离

			}
		},
		methods: {
			transition({
				detail: {
					dy
				}
			}) { // 下拉刷新
			// console.log(dy,'是dy')
				if (dy < 0) {
					this.pulldownRefresh = dy
					if (this.pulldownRefreshing) {
						if (1 - -dy / this.pullDownStopDistance > 0) {
							this.pulldownRefreshingTop = (1 - -dy / this.pullDownStopDistance) * this.pullDownRefreshDistance
						}
					}
					// console.log('下拉')
					setTimeout(() => {
						
						this.pullup()
						// this.$refs.pulldownRefresher.pulldown()
					}, 1000)
				} else if(dy > 0){
					this.pullupRefresh = dy
					if (this.pullupRefreshing) {
						this.pullupRefreshingTop = (1 - -dy / this.pullupStopDistance) * this.pullupRefreshDistance
						
						// console.log('上拉',this.pullupRefreshingTop, 1 - -dy , this.pullupStopDistance , this.pullupRefreshDistance)
						setTimeout(() => {
							// console.log('99',this.pullupRefreshingTop)
							this.pull_up()
							// this.$refs.pulldownRefresher.pulldown()
						}, 1000)
					}
				}


				// if (this.pulldownRefreshing) {
				// 	if (1 - -dy / this.pullDownStopDistance > 0) {
				// 		this.pulldownRefreshingTop = (1 - -dy / this.pullDownStopDistance) * this.pullDownRefreshDistance
				// 	}
				// } else if (this.pullupRefreshing) {
				// 	this.pullupRefreshingTop = (1 + dy * this.pullupStopDistance) / this.pullupRefreshDistance
				// 	console.log(343)
				// }
			},
			touchend() {
				if (this.pulldownRefresh < -this.pullDownRefreshDistance) {
					this.$emit('pulldownRefresh')
					this.pulldownRefreshing = true
					this.pullDownStopDistance = -this.pulldownRefresh
					console.log('1111')
				} else {
					this.$emit('pullupRefresh')
					this.pullupRefreshing = true
					this.pullupStopDistance = this.pullupRefresh

				}

			},
			pullup() {
				console.log(this.pulldownRefreshingTop ,this.pullupRefreshingTop,'ceshi')
				if(this.pulldownRefreshingTop>0){
					this.pulldownRefreshing = false
					const timer = setInterval(() => {
						this.pulldownRefreshingTop -= 4
						// console.log('1811')
						if (this.pulldownRefreshingTop < 0) {
							this.pulldownRefreshingTop = 0
							clearInterval(timer)
						} else {
							this.pulldownRefreshing = false
						}
					}, 10)
					// console.log('1911')
				}else if(this.pullupRefreshingTop>0){
					console.log(123)
					this.pullupRefreshing = false
					const timer = setInterval(() => {
						this.pullupRefreshingTop -= 4
						// console.log('1811')
						if (this.pullupRefreshingTop < 0) {
							this.pullupRefreshingTop = 0
							clearInterval(timer)
						} else {
							this.pullupRefreshing = false
						}
					}, 10)
					// console.log('1911')
					}
				
				
			},
			// pulldown() {
			// 	const timer = setInterval(() => {
			// 		this.pulldownRefreshingTop += 4
			// 		if (this.pulldownRefreshingTop >= this.pullDownRefreshDistance) {
			// 			this.pulldownRefreshingTop = this.pullDownRefreshDistance
			// 			this.pulldownRefreshing = true
			// 			this.$emit('pulldownRefresh')
			// 			clearInterval(timer)
			// 		} else {
			// 			this.pulldownRefreshing = false
			// 		}

			// 	}, 1)
			// },
			// 

			pull_up() {
				this.pullupRefreshing = false
				const timer = setInterval(() => {
					this.pullupRefreshingTop -= 4
					console.log('1811')
					if (this.pullupRefreshingTop < 0) {
						this.pullupRefreshingTop = 0
						clearInterval(timer)
					} else {
						this.pullupRefreshing = false
					}
				}, 10)
				console.log('1911')
			},
			// pull_down() {
			// 	const timer = setInterval(() => {
			// 		this.pullupRefreshingTop += 4
			// 		if (this.pullupRefreshingTop >= this.pullDownRefreshDistance) {
			// 			this.pullupRefreshingTop = this.pullDownRefreshDistance
			// 			this.pullupRefreshing = true
			// 			this.$emit('pullupRefresh')
			// 			clearInterval(timer)
			// 		} else {
			// 			this.pullupRefreshing = false
			// 		}

			// 	}, 1)
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.pulldown-refresher {
		z-index: 0;
		width: 100%;
		height: 100%;
		position: relative;

		.pulldown {
			width: 100%;
			height: 100%;
			position: relative;

			.pulldown-item {
				position: absolute;
				width: 100%;
				height: 100%;
			}
		}

		.pulldown-text {
			top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
			display: flex;
			color: #333333;
			font-size: 26rpx;
			position: absolute;
			align-items: center;
			justify-content: center;
		}

		.pullup-text {
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: -1;
			// height: 60px;
			display: flex;
			color: #333333;
			font-size: 26rpx;
			position: absolute;
			align-items: center;
			justify-content: center;
		}
	}
</style>
