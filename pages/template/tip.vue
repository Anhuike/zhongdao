<template>
	<div class="tip_wrap" v-if="isshow">
		<div class="tipsMask">
			{{tips}}
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:['tips','isshow'],
		methods:{
		}
	}
</script>