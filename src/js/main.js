// кнопка показа формы
let toggleButton = document.getElementById('toggle-button');
// элементы формы
let newItemForm = document.getElementById('new-item-form');
let newItemNameInput = document.getElementById('new-item-name');
let newItemDescriptionInput = document.getElementById('new-item-description');
let newItemAddButton = document.getElementById('new-item-add');
let newItemCancelButton = document.getElementById('new-item-cancel');



const showNewItemForm = () => {
    newItemForm.classList.toggle('form-show');
    toggleButton.classList.toggle('rotate');
};

toggleButton.addEventListener('click', showNewItemForm);

// отмечаем выполнение задачи
let complete = event => {
    event.target.closest('.list__item').classList.toggle('complete');
    showOpenTasksCount();
};

// ф-я для добавления новой задачи в список
const addNewItem = event => {
    event.preventDefault();

    const newItem = createNewItem();
    const ul = document.querySelector('.list ul');

    if (newItem) {
        ul.insertAdjacentElement('afterBegin', newItem);
        showOpenTasksCount();
        bindEvents();
    }
};

// ф-я для удаления существующей задачи из списка
const deleteItem = event => {
    let ul = document.querySelector('.list ul');
    let listItem = event.target.closest('.list__item');
    ul.removeChild(listItem);
    showOpenTasksCount();
};

// ф-я для редактирования задачи
const editItem = event => {
    let listItem = event.target.closest('.list__item');
    let taskName = listItem.querySelector('.task__name');

    taskName.focus();
};

// ф-я привязки события выполнения задачи ко всем чекбоксам
const bindEvents = () => {
    let checkboxes = document.querySelectorAll('.list__item .checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', complete);
    }

    let removeButtons = document.querySelectorAll('.remove');
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', deleteItem);
    }

    let editButtons = document.querySelectorAll('.edit');
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', editItem);
    }
};
bindEvents();

// ф-я скрытия формы (нажатия cancel)
const hideForm = event => {
    event.preventDefault();

    newItemForm.classList.remove('form-show');
    toggleButton.classList.remove('rotate');
};





// ф-я для создания новой задачи (возвращает элемент списка, готовый для вставки)
function createNewItem() {
    if (newItemNameInput.value === '') return alert('Enter the name of the task');
    if (newItemDescriptionInput.value === '') return alert('Enter the description of the task');

    // создание блока status
    let statusDiv = document.createElement('div');
    statusDiv.classList.add('status');

    let label = document.createElement('label');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('option-input', 'checkbox');

    label.appendChild(checkbox);
    statusDiv.appendChild(label);

    // создание блока task
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    let taskName = document.createElement('div');
    taskName.classList.add('task__name');
    taskName.setAttribute('contenteditable', 'true');
    taskName.textContent = newItemNameInput.value;

    let taskDescription = document.createElement('div');
    taskDescription.classList.add('task__description');
    taskDescription.setAttribute('contenteditable', 'true');
    taskDescription.textContent = newItemDescriptionInput.value;

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(taskDescription);

    // создание блока controls
    let controlsDiv = document.createElement('div');
    controlsDiv.classList.add('controls');

    let editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.textContent = 'edit';

    let removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'remove';

    controlsDiv.appendChild(editButton);
    controlsDiv.appendChild(removeButton);

    // создание элемента списка li
    let newListItem = document.createElement('li');
    newListItem.classList.add('list__item');
    newListItem.appendChild(statusDiv);
    newListItem.appendChild(taskDiv);
    newListItem.appendChild(controlsDiv);

    // после создания li очищаем поля формы
    newItemNameInput.value = '';
    newItemDescriptionInput.value = '';

    return newListItem;
}

// отображаем количество оставшихся задач
const showOpenTasksCount = () => {
    let listItems = document.querySelectorAll('.list__item');
    let count = 0;
    let stateCount = document.getElementById('state__count');

    for (let i = 0; i < listItems.length; i++) {
        if (!listItems[i].classList.contains('complete')) {
            count++;
        }
    }

    stateCount.textContent = count.toString();
};

// когда страница подгрузится, отображаем открытые задачи
window.addEventListener('load', showOpenTasksCount);

// события нажатия кнопок формы при добавлении новой задачи
newItemAddButton.addEventListener('click', addNewItem);
newItemCancelButton.addEventListener('click', hideForm);