(function(window){
	'use strict';
    var app=angular.module('todoApp',['todoApp.directive','todoApp.service']);
	app.controller('todoCtrl',['$scope','$filter','$log','strorageService',function($scope,$filter,$log,strorageService){
		//获取数据
		$scope.todoList=strorageService.getTodoList();
		//随机产生一个ID

		//添加数据
		$scope.todoText="";
		$scope.addTodo=function(){
			if($scope.todoText.length>0){
				strorageService.addTodoList($scope.todoText);
			}
			$scope.todoText="";
		}
		//删除数据
		$scope.delTodo=function(todo){
			$scope.todoList=strorageService.delTodo(todo);

		}

		//编辑数据
		$scope.editText={};
		$scope.editTodo=function(todo){
			$scope.editText=todo;
		}
		//失去焦点保存数据
		$scope.blurSave=function(){
			$scope.todoList=strorageService.editTodo($scope.todoList);
			$scope.editText={};
		}
		//已未完成数量的统计
		$scope.$watch('todoList',function(newVal,oldVal){
			$scope.itemLeft=$filter('filter')(newVal,{'status':false}).length;
			$scope.toggleAll=!$scope.itemLeft;
			//显示与隐藏
			$scope.isShow=$filter('filter')(newVal,{'status':true}).length>0?true:false;
			$scope.showFooter=$scope.todoList.length>0?true:false;

		},true);

		//清除已完成数据
		$scope.clearCompleted=function(){
			$scope.todoList=strorageService.clearCompleted();
		}

		//全选功能
		$scope.changeToggleAll=function(){
			$scope.todoList=strorageService.changeToggleAll($scope.toggleAll);
		}

		//status的切换
		$scope.filterStatus={};
		$scope.changeStatus=function(status){
			switch(status){
				case 'active':
					$scope.filterStatus={'status':false};
					break;
				case 'completed':
					$scope.filterStatus={'status':true};
					break;
				default:
					$scope.filterStatus={}
					break;
			}
		}



	}])


})(window);
