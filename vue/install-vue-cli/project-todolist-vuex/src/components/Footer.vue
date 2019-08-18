<template>
	<div class="Footer">
		<input 
		type="checkbox"
		v-model="allDone"
		>
		<span>{{totalDone}}/{{total}}</span>
		<button @click="handleDelDone">删除所有完成的任务</button>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		name:'Footer',
		computed:{
			/*
			total(){
				return this.$store.state.todos.length
			},

			totalDone(){
				*/
				/*
				let total = 0;
				this.todos.forEach(item=>{
					if(item.done){
						total++
					}
				})
				*/
			/*
				return this.$store.state.todos.reduce((total,item)=>{
					if(item.done){
						total++;
					}
					return total
				},0)	
			},
			*/
			...mapGetters([
				'total',
				'totalDone'
			]),
			allDone:{
				get(){
					return this.$store.getters.allDone
				},
				set(value){
					// this.selectAllTodo(value);
					this.$store.dispatch('selectAllTodo',value)
				}
			}
		},
		methods:{
			handleDelDone(){
				if(window.confirm("您确定删除所有已经完成任务吗")){
					this.$store.dispatch('delAllDoneTodo')
				}
			}
		}
	}
</script>
<style scoped>
	.Footer{
		width: 100%;
		line-height: 40px;
		margin-top: 20px;
	}
	.Footer input{
		float: left;
		margin-top: 14px;
		margin-right:10px;
	}
	.Footer span{
		float: left;
		height: 30px;
	}
	.Footer button{
		float: right;
		height: 30px;
	}
</style>