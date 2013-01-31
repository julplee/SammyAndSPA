// Client-side routes  
Sammy(function () {
    this.get('#todos', function () {
        self.isStatsChoose(false);
    });

    this.get('#stats', function () {
        self.isStatsChoose(true);
    });

    this.get('', function () {
        this.app.runRoute('get', '#todos');
    });

}).run();