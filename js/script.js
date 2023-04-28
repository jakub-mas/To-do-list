{
    const tasks = [];

    const render = () => {
        let htmlString = ""

        for (const task of tasks)
            htmlString += `
            <li class="list__items">
            <button class="list__button--done">✓</button>
            ${task.content}
            <button class="list__button--remove">🗑</button>
            </li>
        `;

        document.querySelector(".js-list").innerHTML = htmlString;

    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-input").value.trim();
        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}