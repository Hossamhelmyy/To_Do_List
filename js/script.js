// selectors :

const input_to_do = document.querySelector('#input');
const paragraphDiv = document.querySelector('.paragraph');
const paragraph = document.querySelector('.paragraph p');
const closeBtn = document.querySelector('.close');
const email_input = document.querySelector('.email-input');
const tab = document.querySelector('.tab');
const tabLi = document.querySelectorAll('.tab li');
const contentLi = document.querySelectorAll('.contents li');
const inputForm = document.querySelectorAll(
    '.form-control:not(.btn-success)',
);
const sendBtn = document.querySelector('.btn-success');
const table = document.querySelector('.table');
const form = document.querySelector('#form');
const ul = document.querySelector('.todos');
const deleteBtn = document.querySelector('.delete-all');

//variables.
let li;
let todos;
let array_of_list = [];
let output = '';

// event onkeyup on the input.
input_to_do.onkeyup = function(e) {
    if (input_to_do.value == '') {
        paragraphDiv.classList.add('hidden');
    } else {
        // remove hidden class from div.
        paragraphDiv.classList.remove('hidden');

        // change paragraph value.
        paragraph.textContent = e.target.value;
    }
};

// get items from localStorage and render it into screen.
const li_list = JSON.parse(localStorage.getItem('li'));

if (li_list == null) {
    console.log('list is empty');
} else {
    li_list.forEach((li) => {
        ul.insertAdjacentHTML('afterbegin', li);
    });
}

// event submit on the input.
form.onsubmit = function(e) {
    e.preventDefault();
    if (input_to_do.value !== '') {
        li = document.createElement('div');
        li.innerHTML = `<li>${input_to_do.value}</li>`;

        ul.insertAdjacentHTML('afterbegin', li.innerHTML);
        array_of_list.push(li.innerHTML);
        ul.classList.remove('hidden');
        input_to_do.value = '';
    }
    paragraphDiv.classList.add('hidden');

    // save items in localStorage.
    localStorage.setItem('li', JSON.stringify(array_of_list));
};

// change inial value of array to keep saving the old li_list.
if (li_list == null) {
    console.log('list is empty');
} else {
    li_list.forEach((li_) => {
        array_of_list.push(li_);
    });
}

// event click on closeBtn to hide Div.
closeBtn.onclick = function() {
    paragraphDiv.classList.add('hidden');
    input_to_do.value = '';
};

// delete all li_list from localStorage.
deleteBtn.addEventListener('click', function(e) {
    localStorage.removeItem('li');
});

// event onkeyup on the Email input.

email_input.onkeyup = function(e) {
    // check if the email is valid.

    if (
        e.target.value.includes('@') &&
        e.target.value.includes('.com')
    ) {
        alert('your email is valid');
        e.target.value = '';
    } else {
        console.log(' your Email not valid');
    }
};

// event delegation on tab to give all tabs event click.

tab.addEventListener('click', function(e) {
    const btn = e.target.closest('.tab a');
    if (!btn) return;
    contentLi.forEach((li) => {
        li.classList.remove('active');

        // check if the btn href is equal to li id.
        if (btn.href.slice(-4) == li.getAttribute('id')) {
            tabLi.forEach((tab) => {
                tab.classList.remove('active');
            });
            btn.parentElement.classList.add('active');
            li.classList.add('active');
            btn.classList.add('active');
            table.innerHTML = `<tr>
            <td>name</td>
            <td>address</td>
            <td>salary</td>
        </tr>`;
        }
    });
});

sendBtn.addEventListener('click', function(e) {
    for (let i = 0; i < inputForm.length; i++) {
        // check if the inputs have value.
        if (inputForm[i].value !== '') {
            // create new tr with the inputs value.
            output = `<tr>
                <td>${inputForm[0].value}</td>
                <td>${inputForm[1].value}</td>
                <td>${inputForm[2].value}</td>
                 </tr>`;
        }
    }

    // insert the output variable into the table element.
    table.insertAdjacentHTML('beforeend', output);

    // call clear func to clear the input fields
    clear();
});

// func clear input fields.
function clear() {
    inputForm.forEach((input) => {
        input.value = '';
    });
}