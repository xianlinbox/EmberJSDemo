/**
 * Created by xnliu on 8/19/14.
 */
Todos.TodosController = Ember.ArrayController.extend({
    actions: {
        createTodo: function () {
            var title = this.get('newTitle');
            if (!title || !title.trim()) {
                return false;
            }

            var todo = this.store.createRecord('todo', {
                title: title,
                isCompleted: false
            });

            this.set('newTitle', '');
            todo.save();
        },

        clearCompleted: function () {
            var completedItems = this.filterBy('isCompleted',true);
            completedItems.invoke('deleteRecord');
            completedItems.invoke('save');
        }
    },

    remains: function () {
        return this.filterBy('isCompleted', false).get('length');
    }.property('@each.isCompleted'),

    reflection: function () {
        return this.get('remains') === 1 ? 'item' : 'items';
    }.property('remains'),

    hasCompleted: function () {
        return this.get('completed') > 0;
    }.property('completed'),

    completed: function () {
        return this.filterBy('isCompleted',true).get('length');
    }.property('@each.isCompleted'),

    allCompleted: function(key,value){
        if(value === undefined){
            return !!this.get('length') && this.isEvery('isCompleted',true);
        }else{
            this.setEach('isCompleted',value);
            this.invoke('save');
            return value;
        }
    }.property('@each.isCompleted')
});

Todos.TodoController = Ember.ObjectController.extend({
    actions: {
        editTodo: function () {
            console.log("call EditTodo");
            this.set('isEditing', true);
        },

        acceptChanges: function () {
            this.set('isEditing', false);
            if (Ember.isEmpty(this.get('model.title'))) {
                this.send('removeTodo');
            } else {
                this.get('model').save();
            }
        },

        removeTodo: function () {
            var todo = this.get('model');
            todo.deleteRecord();
            todo.save();
        }
    },

    isEditing: false,

    isCompleted: function (key, value) {
        var model = this.get('model');
        if (value === undefined) {
            return model.get('isCompleted');
        } else {
            model.set('isCompleted', value);
            model.save();
            return value;
        }
    }.property('model.isCompleted')
});