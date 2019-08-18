<template>
	<div class="Header">
		<input 
		type="text" 
		placeholder="请输入任务,按回车键提交"
		v-model="task"
		@keyup.enter="handleAdd"
		
		>
	</div>
</template>
<script>
	export default {
		name:'Header',
		data(){
			return{
				task:''
			}
		},
		methods:{
			handleAdd(){
				//判断数据
				const task = this.task.trim();
				if(!task){
					alert('任务不能为空');
					return;
				}
				//2.生成todo对象
				const todo={
					task,
					done:false
				}
				//3.向数组插入数据
				// console.log(this.$store)
				this.$store.dispatch('addTodo',todo)
				//4.清空
				this.task='';
			}
		}
	}
</script>
<style scoped>
	.Header input{
		width: 100%;
		height: 30px;
		padding:0 20px;
		box-sizing: border-box;
	}
	.Header{
		margin-bottom: 10px;
	}
</style>