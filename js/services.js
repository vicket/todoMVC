/**
 * Created by vicket on 2017/3/3.
 */
(function(angular){
    var app=angular.module('todoApp.service',[]);
    app.service('strorageService',['$filter',function($filter){
        //��ȡ����
        var todoList=JSON.parse(localStorage.getItem('todoList')||'[]');
        function getID(){
            return Math.random();
        }
        this.getTodoList=function(){
            return todoList;
        }
        //�������
        this.addTodoList=function(text){
            todoList.push({id:getID(),text:text,status:false});
            this.saveTodo();
        }
        //��������
        this.saveTodo=function(){
            localStorage.setItem('todoList',JSON.stringify(todoList));
        }

        //ɾ������
        this.delTodo=function(todo){
            var index=todoList.indexOf(todo);
            todoList.splice(index,1);
            this.saveTodo();
            return todoList;
        }

        //�༭���ݱ���
        this.editTodo=function(todos){
           localStorage.setItem('todoList',JSON.stringify(todos));
            todoList=todos;
            return todoList;
        }

        //������������
        this.clearCompleted=function(){
            todoList=$filter('filter')(todoList,{status:false});
            this.saveTodo();
            return todoList;
        }

        //ȫѡ����
        this.changeToggleAll=function(toggleAll){
            todoList.forEach(function(item){
                item.status=toggleAll;
            });
            this.saveTodo();
            return todoList;
        }
    }])
})(angular)