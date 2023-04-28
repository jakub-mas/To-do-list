{
    const tasks = [
        {
            content: "test"
        },
    ];

    const render = () => {
       let htmlString = ""

       for(const task of tasks )
        htmlString += `
            <li class="list__items">
            <button class="list__button--done">✓</button>
            ${task.content}
            <button class="list__button--remove">🗑</button>
            </li>
        `;

        document.querySelector(".js-list").innerHTML = htmlString;

    };

    const init = () => {
        render();
    };

    init();
}