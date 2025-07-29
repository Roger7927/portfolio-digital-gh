document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.btn-neon-filter');

    let tasks = loadTasks(); // Carrega as tarefas salvas no localStorage

    renderTasks(tasks); // Renderiza as tarefas ao carregar a página

    // Adicionar tarefa ao clicar no botão ou pressionar Enter
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Delegar eventos para marcar como concluído ou deletar
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('task-checkbox')) {
            toggleTaskComplete(e.target.dataset.id);
        } else if (e.target.classList.contains('delete-btn')) {
            deleteTask(e.target.dataset.id);
        }
    });

    // Eventos para filtrar tarefas
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderTasks(tasks, e.target.dataset.filter);
        });
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = {
                id: Date.now().toString(), // ID único para a tarefa
                text: taskText,
                completed: false
            };
            tasks.push(newTask);
            saveTasks();
            renderTasks(tasks); // Renderiza todas as tarefas, não importa o filtro atual
            taskInput.value = ''; // Limpa o input
        }
    }

    function toggleTaskComplete(id) {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks(tasks, document.querySelector('.btn-neon-filter.active').dataset.filter);
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks(tasks, document.querySelector('.btn-neon-filter.active').dataset.filter);
    }

    function renderTasks(currentTasks, filter = 'all') {
        taskList.innerHTML = ''; // Limpa a lista antes de renderizar

        let filteredTasks = currentTasks;
        if (filter === 'pending') {
            filteredTasks = currentTasks.filter(task => !task.completed);
        } else if (filter === 'completed') {
            filteredTasks = currentTasks.filter(task => task.completed);
        }

        if (filteredTasks.length === 0 && tasks.length > 0) {
            // Caso não haja tarefas para o filtro atual, mas haja tarefas totais
            const noTasksMessage = document.createElement('li');
            noTasksMessage.className = 'task-item';
            noTasksMessage.style.justifyContent = 'center';
            noTasksMessage.style.color = 'var(--text-secondary)';
            noTasksMessage.textContent = `Nenhuma tarefa ${filter === 'pending' ? 'pendente' : 'concluída'}.`;
            taskList.appendChild(noTasksMessage);
            return;
        } else if (tasks.length === 0) {
             const noTasksMessage = document.createElement('li');
            noTasksMessage.className = 'task-item';
            noTasksMessage.style.justifyContent = 'center';
            noTasksMessage.style.color = 'var(--text-secondary)';
            noTasksMessage.textContent = "Nenhuma tarefa adicionada ainda. Que tal começar?";
            taskList.appendChild(noTasksMessage);
            return;
        }


        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div class="task-content">
                    <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                    <span class="task-text">${task.text}</span>
                </div>
                <button class="delete-btn" data-id="${task.id}"><i class="fas fa-trash-alt"></i></button>
            `;
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasknexusTasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasknexusTasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }
});