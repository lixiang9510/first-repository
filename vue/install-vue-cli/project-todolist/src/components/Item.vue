<template>
	<div 
		class="Item"
		:style="{background:bgColor}"
		@mouseenter="handleEnter(true)" 
		@mouseleave="handleLeave(false)" 
	>
		<input type="checkbox" v-model="todo.done">
		<span>{{todo.task}}</span>
		<button
			v-show="IsShow"
			@click="handleDel"
		>删除</button>
	</div>
</template>
<script>
	export default {
		props:{
			todo:Object,
			delTodo:Function,
			index:Number,
		},
		data(){
			return{
				bgColor:'',
				IsShow:false
			}
		},
		methods:{
			handleEnter(flash){
				this.bgColor = flash ? '#ff6700':'#fff';
				this.IsShow = flash
			},
			handleLeave(flash){
				this.bgColor = flash ? '#ff6700':'#fff';
				this.IsShow = flash
			},
			handleDel(){
				if(window.confirm('您确定要删除'+ this.todo.task+'吗？')){
					this.delTodo(this.index)
				}
				
			}
		},
		name:'Item'
	}
</script>
<style scoped>
	.Item{
		width: 100%;
		height: 40px;
		line-height: 40px;
		border:1px dashed #ccc;
	}
	.Item input{
		float: left;
		height: 20px;
		margin-top: 14px;
		margin-right: 10px;
	}
	.Item span{
		float: left;
		height: 30px;
	}
	.Item button{
		float: right;
		margin-top: 5px;
		height: 30px;
	}
</style>