{
    let tasks = [];
    let hideDoneTasks = false

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ]

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];

        render();
    };


    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return { ...task, done: !task.done };
            }
            return task;
        });
        render();
    };


    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const toggleAllTasksDone = () => {
        const areAllTasksDone = tasks.every((task) => task.done);

        tasks = tasks.map((task) => ({
            ...task,
            done: !areAllTasksDone,
        }));
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            if (hideDoneTasks && task.done) {
                htmlString += `
              <li class="list__items hidden"> <!-- Add the "hidden" class -->
                <button class="list__button--done js-done">${task.done ? "✓" : ""}</button>
                <span class="${task.done ? "list__text--done" : ""}">${task.content}</span>
                <button class="list__button--remove js-remove">🗑</button>
              </li>
            `;
            } else {
                htmlString += `
              <li class="list__items">
                <button class="list__button--done js-done">${task.done ? "✓" : ""}</button>
                <span class="${task.done ? "list__text--done" : ""}">${task.content}</span>
                <button class="list__button--remove js-remove">🗑</button>
              </li>
            `;
            }
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    };



    const renderButtons = () => {
        const sectionHeader = document.querySelector(".js-header");
        sectionHeader.innerHTML = "";

        let buttonsHtml = `<h2 class="section__title">Lista zadań</h2>`;

        if (tasks.length > 0) {
            buttonsHtml = `
            <h2 class="section__title">Lista zadań</h2>
            <button class="button js-toggleHideDoneTasks">${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}</button>
            <button class="button js-toggleAllTasksDone">Zmień wszystkie</button>
          `
        };

        sectionHeader.innerHTML = buttonsHtml;
    };



    const bindButtonsEvents = () => {
        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");
        const toggleAllTasksDoneButton = document.querySelector(".js-toggleAllTasksDone");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }

        if (toggleAllTasksDoneButton) {
            toggleAllTasksDoneButton.addEventListener("click", toggleAllTasksDone);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-input");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}