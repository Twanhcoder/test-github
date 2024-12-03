let addTodo = document.getElementById('addTaskButton');

let listTasks = document.getElementById('list-tasks');
let inputField = document.getElementById('input-field');

let textEmpty = document.getElementById('text-Empty');
let waringAlert = document.getElementById('popu-waring');
let closeWaring = document.getElementById('close-waring');
let todoCard = document.getElementById('todo-card');


//*============== CALL FUNTION RENDER DATA TASK FROM LOCALSTORAGE ================= */
loadTask();


/*============== WHEN CLICK ADD ITEM IS CALL FUNTION saveTask ================= */
addTodo.addEventListener('click',saveTask);

/*============== WHEN PRESS 'Enter' IS CALL FUNTION saveTask ================= */
inputField.addEventListener('keypress',(e)=>{
    if (inputField.value && e.key === 'Enter'){
        saveTask();
    }
    else{
        if (!inputField.value && e.key == 'Enter'){
            waringEmptyTask();
        }
    }
});

/*============== FUNTION WARING IF USER ENTER INPUT TASK IS EMPTY ================= */
function waringEmptyTask(){
    waringAlert.style.display = "flex";
    todoCard.style.filter = "blur(30px)";

    closeWaring.addEventListener('click',()=>{
        waringAlert.style.display = "none";
        todoCard.style.filter = "blur(0px)";
    })
}

/*============== FUNTION CREAT ELEMENT ================= */
function createElementTask(idTask,task,activeCheckBox){

    /*====================== CREAT ELEMENT FOR TASK========================= */
    const liTask = document.createElement('li');
    liTask.className = "task__content";
    liTask.setAttribute("id", "taskContent");
    listTasks.appendChild(liTask);

    const todoItem = `<p class="name__task" id="nameTask">${task}</p>
                      <div class="action__task">
                          <i class='bx bx-checkbox-square bx-md bx__noCheck' id="checkBox" onclick="checkTask(${idTask},${activeCheckBox})"></i>
                          <i class='bx bxs-trash bx-sm bx__trash' id="deleTask" onclick="deleteTask(${idTask})"></i>
                      </div>`
    liTask.innerHTML = todoItem;
}

/*====================== FUNTION CHECKBOX TO COMPELETE TASK ========================= */
function checkTask(idTask,activeCheckBox){

    todoCheckBox = JSON.parse(localStorage.getItem('taskList'));
    const taskName = listTasks.querySelectorAll('p#nameTask');
    const iCheckBox = listTasks.querySelectorAll('i#checkBox');
    

    for(let i=0; i < todoCheckBox.length; i++){
        if (todoCheckBox[i].idTask == idTask){
            if (todoCheckBox[i].checkBoxStatus == false){
                taskName[i].style.textDecoration = "line-through";
                taskName[i].style.filter = "opacity(50%)";

                iCheckBox[i].classList.remove(
                    'bx',
                    'bx-checkbox-square',
                    'bx-md',
                    'bx__noCheck');
                iCheckBox[i].classList.add('bx',
                    'bxs-check-square',
                    'bx-sm', 
                    'bx__Checked');

                todoCheckBox[i].checkBoxStatus = true;
                activeCheckBox = true;
                localStorage.setItem('taskList', JSON.stringify(todoCheckBox));
            }
            else{
                taskName[i].style.textDecoration = "none";
                taskName[i].style.filter = "opacity(100%)";

                
                iCheckBox[i].classList.remove('bx',
                    'bxs-check-square',
                    'bx-sm', 
                    'bx__Checked');
                iCheckBox[i].classList.add(
                    'bx',
                    'bx-checkbox-square',
                    'bx-md',
                    'bx__noCheck');

                todoCheckBox[i].checkBoxStatus = false;
                activeCheckBox = false;
                localStorage.setItem('taskList', JSON.stringify(todoCheckBox));
            }
        }
    }
}

/*====================== DELETE TASK ========================= */
function deleteTask(idTask){

    todoData = JSON.parse(localStorage.getItem('taskList'));

    const listElement = listTasks.querySelectorAll('li#taskContent');

    for(let i=0; i < todoData.length; i++){
        if (todoData[i].idTask == idTask){
            todoData.splice(i, 1);
            listElement[i].parentNode.removeChild(listElement[i]);
            localStorage.setItem('taskList', JSON.stringify(todoData));
        }
    }

    // if arr tasks = empty, print waring that list is empty right now
    if (todoData.length == 0 || todoData == []){
        textEmpty.style.display = "block";
    }
    else{
        textEmpty.style.display = "none";
    }

}


//Funtion to check Arr
function checkArr(tasksCheck){

    tasksCheck = JSON.parse(localStorage.getItem('taskList'));

    if(!tasksCheck){
        tasksCheck = [];
        return tasksCheck;
    }
    else{
        return tasksCheck;
    }
}

//Funtion to find id largest
function checkID(todo,idMax){
    todo = JSON.parse(localStorage.getItem('taskList'));
    if(!todo || todo.length == 0 || todo === undefined){
        idTask=0;
        return idTask;
    }
    else{
        let maxID = 0
        todo.forEach((item)=>{
            if(item.idTask > maxID){
                maxID = item.idTask; 
            }
        })
        idMax = maxID;
        return idMax+1;
    }
}



/*============= SAVE TASK INTO OBJECT & PUSH THE ARRAY INSIDE localStorage =================== */
function saveTask(){

    const task = inputField.value.trim();
    let tasks, tasksCheck;
    let idTask, idCheck;
    let activeCheckBox = false;

    //Call funtion to check Array
    tasks = checkArr(tasksCheck);

    //Call funtion to find id largest
    idTask = checkID(tasks, idCheck);

    if (task){
        // funtion add value in a Object
        function ObjTask(idTask, nameTaskValue,checkBoxStatus){
            this.idTask = idTask,
            this.nameTaskValue = nameTaskValue,
            this.checkBoxStatus = checkBoxStatus
        }

        tasks.push(new ObjTask(idTask, task, activeCheckBox));
        localStorage.setItem('taskList', JSON.stringify(tasks));

        // if arr tasks = empty, print waring that list is empty right now
        if (tasks.length == 0 || tasks == []){
            textEmpty.style.display = "block";
        }
        else{
            textEmpty.style.display = "none";
        }

        createElementTask(idTask,task, activeCheckBox);
    }
    else{
        waringEmptyTask();
    }

    inputField.value = '';
}


/*========== RENDER TASKS FROM LISH TASK SAVED INTO ARRAY INSIDE localStorage ========================= */
function loadTask(){
    const todoLoad = JSON.parse(localStorage.getItem('taskList')) || [];

    if (todoLoad.length == 0 || todoLoad == undefined){
        textEmpty.style.display = "block";
    }
    else{
        textEmpty.style.display = "none";
    }

    todoLoad.forEach((element)=>{
        /*====================== CREAT ELEMENT FOR TASK========================= */
        const liTask = document.createElement('li');
        liTask.className = "task__content";
        liTask.setAttribute("id", "taskContent");
        listTasks.appendChild(liTask);

        const todoItem = `<p class="name__task" id="nameTask">${element.nameTaskValue}</p>
                          <div class="action__task">
                              <i class='bx bx-checkbox-square bx-md bx__noCheck' id="checkBox" onclick="checkTask(${element.idTask},${element.checkBoxStatus})"></i>
                              <i class='bx bxs-trash bx-sm bx__trash' id="deleTask" onclick="deleteTask(${element.idTask})"></i>
                          </div>`
        liTask.innerHTML = todoItem;

        const taskName = liTask.querySelector('p#nameTask');
        const iCheckBox = liTask.querySelector('i#checkBox');

        if(element.checkBoxStatus == true){
            taskName.style.textDecoration = "line-through";
            taskName.style.filter = "opacity(50%)";

            iCheckBox.classList.remove(
                'bx',
                'bx-checkbox-square',
                'bx-md',
                'bx__noCheck');
            iCheckBox.classList.add('bx',
                'bxs-check-square',
                'bx-sm', 
                'bx__Checked');
        }
        else{
            taskName.style.textDecoration = "none";
            taskName.style.filter = "opacity(100%)";

                
            iCheckBox.classList.remove('bx',
                'bxs-check-square',
                'bx-sm', 
                'bx__Checked');
            iCheckBox.classList.add(
                'bx',
                'bx-checkbox-square',
                'bx-md',
                'bx__noCheck');
        }
    }) 
}