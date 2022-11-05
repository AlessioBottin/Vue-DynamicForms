import DynamicForm from './components/DynamicForm.vue'

export default {
    install: (app, options) => {
        app.component('DynamicForm', DynamicForm)
    }
}