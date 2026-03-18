if (typeof document !== 'undefined') {
    //1. Create three variables that hold references to the list (<ul>), <input>, and <button> elements.
    const list = document.querySelector('ul');
    const input = document.querySelector('#student');
    const addButton = document.querySelector('.addStudent');
    const countElement = document.querySelector('.counter span');

    const students = new Set();

    //2. Add an EventListener to the "Add student" button which calls the addStudent function
    addButton.addEventListener('click', addStudent);
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addStudent();
        }
    });

    function normalizeName(name) {
        return name.trim().replaceAll(/\s+/g, ' ').toLowerCase();
    }

    function updateCounter(change) {
        const currentCount = Number(countElement.textContent.trim()) || 0;
        countElement.textContent = String(Math.max(0, currentCount + change));
    }

    //3. Create a function that will run in response to the button being clicked.
    function addStudent() {
        //4. Inside the function body, start off by storing the current value of the input element in a variable.
        const studentName = input.value.trim().replaceAll(/\s+/g, ' ');

        //5. Next, empty the input element by setting its value to an empty string — ''.
        input.value = '';

        if (studentName === '') {
            input.focus();
            return;
        }

        const normalizedName = normalizeName(studentName);
        if (students.has(normalizedName)) {
            input.focus();
            return;
        }

        //6. Create three new elements — a list item (<li>), <span>, and <button>, and store them in variables.
        const listItem = document.createElement('li');
        const nameSpan = document.createElement('span');
        const deleteButton = document.createElement('button');

        //7.Append the span and the button as children of the list item.
        listItem.appendChild(nameSpan);
        listItem.appendChild(deleteButton);

        //8. Set the text content of the span to the input element value you saved earlier, and the text content of the button to 'Delete'.
        nameSpan.textContent = studentName;
        deleteButton.textContent = 'Delete';

        //9. Append the list item as a child of the list.
        list.appendChild(listItem);

        students.add(normalizedName);
        updateCounter(1);

        //10. Attach an event handler to the delete button so that, when clicked, it will delete the entire list item (<li>...</li>).
        deleteButton.addEventListener('click', () => {
            listItem.remove();
            students.delete(normalizedName);
            updateCounter(-1);
            input.focus();
        });

        //11.Use the focus() method to focus the input element ready for entering the next shopping list item.
        input.focus();
    }
}




