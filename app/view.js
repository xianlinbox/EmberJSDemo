/**
 * Created by xnliu on 8/20/14.
 */
Todos.EditTodoView = Ember.TextField.extend({
    didInsertElement:function(){
        this.$().focus();
    }
});

Ember.Handlebars.helper('edit-todo',Todos.EditTodoView);