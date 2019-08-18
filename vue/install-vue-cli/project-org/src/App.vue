<!--1 页面 -->
<template>
	<div class="App">
		App
		<Logo />
		<Message msg="您好"/>
	</div>
</template>
<!-- 2 逻辑 -->
<script>
	import Logo from './components/Logo.vue';
	import Message from './components/message.vue';
	export default {
		name:'App',
		components:{
			Logo,
			Message
		}
	}
</script>
<!-- 3 样式 -->
<style>
</style>