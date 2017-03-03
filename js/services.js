/**
 * Created by vicket on 2017/3/3.
 */
(function(angular){
    var app=angular.module('todoApp.service',[]);
    app.service('strorageService',['$filter',function($filter){
        //获取数据
        var todoList=JSON.parse(localStorage.getItem('todoList')||'[]');
        function getID(){
            return Math.random();
        }
        this.getTodoList=function(){
            return todoList;
        }
        //添加数据
        this.addTodoList=function(text){
            todoList.push({id:getID(),text:text,status:false});
            this.saveTodo();
        }
        //保存数据
        this.saveTodo=function(){
            localStorage.setItem('todoList',JSON.stringify(todoList));
        }

        //删除数据
        this.delTodo=function(todo){
            var index=todoList.indexOf(todo);
            todoList.splice(index,1);
            this.saveTodo();
            return todoList;
        }

        //编辑数据保存
        this.editTodo=function(todos){
           localStorage.setItem('todoList',JSON.stringify(todos));
            todoList=todos;
            return todoList;
        }

        //清除已完成数据
        this.clearCompleted=function(){
            todoList=$filter('filter')(todoList,{status:false});
            this.saveTodo();
            return todoList;
        }

        //全选功能
        this.changeToggleAll=function(toggleAll){
            todoList.forEach(function(item){
                item.status=toggleAll;
            });
            this.saveTodo();
            return todoList;
        }
    }])
})(angular)