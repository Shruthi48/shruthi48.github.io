import Users from './fetchUsers';

import '../styles/app.scss';


const init = async () => {
    const template = document.createElement('Template');
    template.innerHTML = `<header> <h1> This is my setup </h1> <div> ${await Users()}</div></header> <div class="empty">
    <div class="fill" draggable="true">
       <div> 
          My Todo List
       </div>
    </div>
  </div>

  <div class="empty">
  </div>

  <div class="empty">
  </div>

  <div class="empty">
  </div>

  <div class="empty">
  </div>`
    const newTemplate = template.content.cloneNode(true)
    const layout = document.querySelector('#app');
    layout.appendChild(newTemplate)

    dragAndDrop();
    
}


const dragAndDrop = () => {
    const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

// Fill listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

// Loop through empty boxes and add listeners
for (const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

// Drag Functions

function dragStart() {
  this.className += ' hold';
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  this.className = 'fill';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  this.className = 'empty';
}

function dragDrop() {
  this.className = 'empty';
  this.append(fill);
}

}


init();
