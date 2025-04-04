let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        renderTasks();

        // Add event listener for Enter key
        document.getElementById("taskInput").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                addTask();
            }
        });

        function addTask() {
            let input = document.getElementById("taskInput");
            if (!input.value.trim()) return;
            
            // Add new task with animation
            tasks.unshift({ text: input.value, completed: false });
            input.value = "";
            saveAndRender();
        }

        function toggleTask(index) {
            tasks[index].completed = !tasks[index].completed;
            saveAndRender();
        }

        function editTask(index) {
            let newText = prompt("Edit task:", tasks[index].text);
            if (newText !== null && newText.trim() !== "") {
                tasks[index].text = newText;
                saveAndRender();
            }
        }

        function deleteTask(index) {
            if (confirm("Are you sure you want to delete this task?")) {
                tasks.splice(index, 1);
                saveAndRender();
            }
        }

        function saveAndRender() {
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }

        function renderTasks() {
            const taskList = document.getElementById("taskList");
            const emptyState = document.getElementById("emptyState");
            
            // Update task counter
            const remainingTasks = tasks.filter(task => !task.completed).length;
            document.getElementById("taskCount").textContent = 
                `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} remaining`;
            
            if (tasks.length === 0) {
                taskList.innerHTML = '';
                emptyState.style.display = "block";
                return;
            }
            
            emptyState.style.display = "none";
            
            taskList.innerHTML = tasks.map((task, i) =>
                `<li class="task-item">
                    <span class="task-text ${task.completed ? 'completed' : ''}" onclick="toggleTask(${i})">
                        ${task.text}
                    </span>
                    <div class="task-actions">
                        <button class="btn btn-edit" onclick="editTask(${i})" title="Edit">✏️</button>
                        <button class="btn btn-delete" onclick="deleteTask(${i})" title="Delete">🗑️</button>
                    </div>
                </li>`
            ).join("");
        }