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

    self.todoCount = ko.computed(function () {
        var count = 0;

        ko.utils.arrayForEach(self.todoLists(), function(TodoList) {
            count += TodoList.Todos().length;
        }, this);

        return count;
    });

    self.isStatsChoose = ko.observable(false);

    self.goToStats = function() {
        location.hash = "stats";
    };

    self.goToTodos = function() {
        location.hash = "todos";
    };
    
    // Client-side routes    
    Sammy(function () {
        this.get('#todos', function () {
            self.isStatsChoose(false);
        });

        this.get('#stats', function () {
            self.isStatsChoose(true);
        });

        this.get('', function() {
            this.app.runRoute('get', '#todos');
        });

    }).run();

})(ko, todoApp.datacontext);


// Initiate the Knockout bindings
ko.applyBindings(window.todoApp.todoListViewModel);
