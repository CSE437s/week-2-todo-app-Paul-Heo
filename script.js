
document.addEventListener("DOMContentLoaded", function() {
    var api_key = "4498dc-6b6e57-7042c7-bea0c4-f5142f";
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
        var data = { text: text };
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var todo = JSON.parse(this.responseText);
                displayTodo(todo);
                input.value = ''; // Clear input field after adding
            }
        };
        xhttp.open("POST", "https://cse204.work/todos", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("x-api-key", api_key);
        xhttp.send(JSON.stringify(data));
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
        var data = { completed: completed };
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                updateTodoStyle(todoElement, completed);
            }
        };
        xhttp.open("PUT", "https://cse204.work/todos/" + id, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("x-api-key", api_key);
        xhttp.send(JSON.stringify(data));
    }

    function updateTodoStyle(todoElement, completed) {
        if (completed) {
            todoElement.classList.add('completed');
        } else {
            todoElement.classList.remove('completed');
        }
    }

    function deleteTodo(id, todoElement) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                todoList.removeChild(todoElement);
            }
        };
        xhttp.open("DELETE", "https://cse204.work/todos/" + id, true);
        xhttp.setRequestHeader("x-api-key", api_key);
        xhttp.send();
    }

    // Load existing ToDos
    loadTodos();
    function loadTodos() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var todos = JSON.parse(this.responseText);
                todos.forEach(displayTodo);
            }
        };
        xhttp.open("GET", "https://cse204.work/todos", true);
        xhttp.setRequestHeader("x-api-key", api_key);
        xhttp.send();
    }

});

