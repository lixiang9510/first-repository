<template>
  <div id="App" class="App">
    <h3>ToDo List</h3>
    <Header  />
    <List /> 
    <Footer 
    />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    List,
    Footer,
  },
  /*
  data(){
    return {
      todos:[
          {task:'吃饭',done:false},
          {task:'学习',done:true},
          {task:'看电影',done:true},
      ]
    }
  },
  */
  methods:{
    addTodo(todo){
      this.todos.unshift(todo);
    },
    delTodo(index){
      this.todos.splice(index,1)
    },
    selectAllTodo(value){
      this.todos.forEach(item=>{
        item.done=value;
      })
    },
    delAllDone(){
      return this.todos=this.todos.filter(item=>!item.done)
    }
  }
}
</script>

<style>
  #App{
    width: 600px;
    margin:100px auto;
  }
  #App h3{
    width: 100%;
    text-align: center;
    line-height: 30px;
  }
</style>
