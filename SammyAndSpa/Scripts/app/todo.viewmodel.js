window.todoApp.todoListViewModel = (function (ko, datacontext) {
    var self = this;

    self.todoLists = ko.observableArray();
    self.error = ko.observable();
    self.addTodoList = function() {
        var todoList = datacontext.createTodoList();
        todoList.IsEditingListTitle(true);
        datacontext.saveNewTodoList(todoList)
            .then(addSucceeded)
            .fail(addFailed);

        function addSucceeded() {
            showTodoList(todoList);
        }

        function addFailed() {
            error("Save of new TodoList failed");
        }
    };
    
    self.showTodoList = function (todoList) {
        todoLists.unshift(todoList); // Insert new TodoList at the front
    },

    self.deleteTodoList = function (todoList) {
        todoLists.remove(todoList);
        datacontext.deleteTodoList(todoList)
            .fail(deleteFailed);

        function deleteFailed() {
            showTodoList(todoList); // re-show the restored list
        }
    };

    datacontext.getTodoLists(todoLists, error); // load TodoLists
    
    self.todoListsCount = ko.computed(function () {
        return todoLists().length;
    }, this);

    self.isStatsChoose = ko.observable(true);

    self.goToStats = function() {
        self.isStatsChoose(true);
    };

    self.goToTodos = function() {
        self.isStatsChoose(false);
    };

})(ko, todoApp.datacontext);


// Initiate the Knockout bindings
ko.applyBindings(window.todoApp.todoListViewModel);
