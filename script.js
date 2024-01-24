
document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById('new-todo-form');
    var input = document.getElementById('new-todo-text');
    var todoList = document.getElementById('todo-list');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var todoText = input.value.trim();
        if (todoText) {
            addTodo(todoText);
        }
    });

    function addTodo(text) {
        var newTodo = { id: Date.now(), text: text, completed: false };
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodo(newTodo); 
        input.value = '';
    }

    function displayTodo(todo) {
        var li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) {
            li.classList.add('completed');
        }
        
        // Checkbox for marking ToDo as complete
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('click', function() {
            toggleComplete(todo.id, checkbox.checked, li);
        });
        li.prepend(checkbox);

        // Delete button
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() {
            deleteTodo(todo.id, li);
        });
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    }

    function toggleComplete(id, completed, todoElement) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: completed };
            }
            return todo;
        });
        localStorage.setItem('todos', JSON.stringify(todos)); 
        updateTodoStyle(todoElement, completed);
    }

    function updateTodoStyle(todoElement, completed) {
        if (completed) {
            todoElement.classList.add('completed');
        } else {
            todoElement.classList.remove('completed');
        }
    }

    function deleteTodo(id, todoElement) {
        todos = todos.filter(todo => todo.id !== id); 
        localStorage.setItem('todos', JSON.stringify(todos)); 
        todoList.removeChild(todoElement); 
    }

    // Load existing ToDos
    loadTodos();
    function loadTodos() {
        var storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        storedTodos.forEach(displayTodo);   
    }


});

