let todos = [];
let nextId = 1;

function badgeClass(status) {
    if (status === 'Done')    return 'badge-done';
    if (status === 'Pending') return 'badge-pending';
    return 'badge-notdone';
}

function render() {
    const tbody = document.getElementById('todoList');
    if (!todos.length) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty">No tasks yet. Click "+ Add task" to get started.</td></tr>';
        return;
    }
    tbody.innerHTML = todos.map(t => `
    <tr>
      <td class="id-cell">${t.id}</td>
      <td class="name-cell">${t.title}</td>
      <td class="desc-cell" title="${t.description}">${t.description}</td>
      <td class="due-cell">${t.due_date}</td>
      <td><span class="badge ${badgeClass(t.status)}">${t.status}</span></td>
      <td>
        <button class="action-btn" onclick="editTodo(${t.id})">Edit</button>
        <button class="action-btn del" onclick="deleteTodo(${t.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function openForm(isEdit = false) {
    document.getElementById('formModal').classList.add('open');
    document.getElementById('modalTitle').textContent = isEdit ? 'Edit task' : 'Add new task';
}

function closeForm() {
    document.getElementById('formModal').classList.remove('open');
    document.getElementById('todoId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('due_date').value = '';
    document.getElementById('status').value = 'Not Done';
}

function saveTodo() {
    const id          = document.getElementById('todoId').value;
    const title       = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const due_date    = document.getElementById('due_date').value;
    const status      = document.getElementById('status').value;

    if (!title || !description || !due_date) return;

    if (id) {
        const todo = todos.find(t => t.id == id);
        if (todo) Object.assign(todo, { title, description, due_date, status });
    } else {
        todos.push({ id: nextId++, title, description, due_date, status });
    }

    closeForm();
    render();
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    document.getElementById('todoId').value      = todo.id;
    document.getElementById('title').value       = todo.title;
    document.getElementById('description').value = todo.description;
    document.getElementById('due_date').value    = todo.due_date;
    document.getElementById('status').value      = todo.status;
    openForm(true);
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    render();
}

// Close modal when clicking outside
document.getElementById('formModal').addEventListener('click', function (e) {
    if (e.target === this) closeForm();
});

render();