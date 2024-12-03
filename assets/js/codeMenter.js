let addTodo = document.getElementById('addTaskButton');

let listTasks = document.getElementById('list-tasks');
let inputField = document.getElementById('input-field');

function addTask() {
  const task = inputField.value;
  console.log(task);
  if (task) {
    createElementTask(task);
    inputField.value = "";
    saveTask(task);
  } else {
    alert("Plesea write a task you want to do.");
  }
}

addTodo.addEventListener("click", addTask);

function createElementTask(task) {
  // Thay đổi đoạn từ dòng 26 -> 46 giúp anh như sau thay vì phải tạo từng element thì hãy làm như sau ví dụ
  // let li = document.createElement("li")
  // const todoItem = `<p class="name__task">Learn VueJS</p>
  //     <div class="action__task">
  //     <i class='bx bxs-check-square bx-sm bx__Checked' style="display: none" id="iChecked"></i>
  //     <i class='bx bx-checkbox-square bx-md bx__noCheck' id="iNoCheck"></i>
  //     <i class='bx bxs-trash bx-sm bx__trash' id="deleTask"></i></div>`
  // li.innerHTML = todoItems
  //-> sử dụng list chưa item rồi appendChild hôm trước anh vừa hướng dẫn nhé
  const liTask = document.createElement("li");
  liTask.className = "task__content";
  listTasks.appendChild(liTask);

  const pTask = document.createElement("p");
  pTask.textContent = task;
  pTask.className = "name__task";
  liTask.appendChild(pTask);

  const divAction = document.createElement("div");
  divAction.className = "action__task";
  liTask.appendChild(divAction);

  const iconCheckbox = document.createElement("i");
  iconCheckbox.classList.add(
    "bx",
    "bx-checkbox-square",
    "bx-md",
    "bx__noCheck"
  );
  iconCheckbox.setAttribute("id", "iNoCheck");
  divAction.appendChild(iconCheckbox);

  const iconDelete = document.createElement("i");
  iconDelete.classList.add("bx", "bxs-trash", "bx-sm", "bx__trash");
  divAction.appendChild(iconDelete);

  iconCheckbox.addEventListener("click", () => {
    if (iconCheckbox.id == "iNoCheck") {
      pTask.style.textDecoration = "line-through";
      pTask.style.filter = "opacity(50%)";

      iconCheckbox.classList.remove(
        "bx",
        "bx-checkbox-square",
        "bx-md",
        "bx__noCheck"
      );
      iconCheckbox.classList.add(
        "bx",
        "bxs-check-square",
        "bx-sm",
        "bx__Checked"
      );
      iconCheckbox.setAttribute("id", "Checked");
    } else {
      pTask.style.textDecoration = "none";
      pTask.style.filter = "opacity(100%)";

      iconCheckbox.classList.remove(
        "bx",
        "bxs-check-square",
        "bx-sm",
        "bx__Checked"
      );
      iconCheckbox.classList.add(
        "bx",
        "bx-checkbox-square",
        "bx-md",
        "bx__noCheck"
      );
      iconCheckbox.setAttribute("id", "iNoCheck");
    }
  });
}

function saveTask(task) {
    // Ví dụ ở đây taskContent lấy id ul bên kia rồi thì chỉ cần làm đoạn trên anh bảo đưa xuống hàm này rồi suy ra thành taskContent.appendChild(li) là xong
    // chỗ check Input cũng vậy, hãy khoanh nhỏ nó lại, chỉ có add item thì mới cần nhập nên check trong hàm saveTask này nha
    
    // trước khi bắt đầu hàm này, em còn phải check xem trên localStorage mảng tasks kia có dữ liệu hay không nếu không ví dụ if (!todo) {todo = [];}
  let taskContent = document.getElementById("taskContent");
  let tasks = [];
  let idTask = 0; 
  // làm 1 hàm tìm trong mảng tasks xem có id nào lớn nhất thì + thêm 1 nếu mảng không có dữ liệu thì bắt đầu từ không
  let nameTaskValue = inputField.value; 
  var ojectTask = new Object(); //hạn chế dùng var nha

  ojectTask.id = idTask;
  ojectTask.nameTask = task;
  // Dùng cách tạo Object như trên cũng được nhưng hãy làm theo cách này để gọn code hơn 
  //let objectTask = { id: id, namTask:  nameTaskValue};
  tasks.push(ojectTask); //<= push a Object right here
  idTask++;

  localStorage.setItem("taskList", JSON.stringify(tasks));

    const pTask = document.createElement('p');
    pTask.textContent = task;
    pTask.className = "name__task";
    liTask.appendChild(pTask);

    const divAction = document.createElement('div');
    divAction.className = "action__task";
    liTask.appendChild(divAction);

    const iconCheckbox = document.createElement('i');
    iconCheckbox.classList.add('bx', 'bx-checkbox-square', 'bx-md', 'bx__noCheck');
    iconCheckbox.setAttribute("id", "iNoCheck")
    divAction.appendChild(iconCheckbox);

    const iconDelete = document.createElement('i');
    iconDelete.classList.add('bx', 'bxs-trash', 'bx-sm', 'bx__trash');
    divAction.appendChild(iconDelete);

    iconCheckbox.addEventListener('click',() => {
        if (iconCheckbox.id == "iNoCheck"){
            pTask.style.textDecoration = "line-through";
            pTask.style.filter = "opacity(50%)";

            iconCheckbox.classList.remove('bx', 'bx-checkbox-square', 'bx-md', 'bx__noCheck');
            iconCheckbox.classList.add('bx', 'bxs-check-square', 'bx-sm', 'bx__Checked');
            iconCheckbox.setAttribute("id", "Checked");
        }
        else{
            pTask.style.textDecoration = "none";
            pTask.style.filter = "opacity(100%)";

            iconCheckbox.classList.remove('bx', 'bxs-check-square', 'bx-sm', 'bx__Checked');
            iconCheckbox.classList.add('bx', 'bx-checkbox-square', 'bx-md', 'bx__noCheck');
            iconCheckbox.setAttribute("id", "iNoCheck");
        }
    })

}

//TẠO RA 1 hàm render list lại theo cách của anh feedback nhé
// todo.forEach((element)=> { 
    // let li = document.createElement("li")
  // const todoItem = `<p class="name__task">${element.nameTask}</p>
  //     <div class="action__task">
  //     <i class='bx bxs-check-square bx-sm bx__Checked' style="display: none" id="iChecked"></i>
  //     <i class='bx bx-checkbox-square bx-md bx__noCheck' id="iNoCheck"></i>
  //     <i class='bx bxs-trash bx-sm bx__trash' id="deleTask" onClick="deleteTask(element.id)"></i></div>`
  // li.innerHTML = todoItems
  //-> sử dụng list chưa item rồi appendChild hôm trước anh vừa hướng dẫn nhé
// })

function saveTask(){

    
    let tasks = [];
    let idTask = 0;
    
    // funtion add value in a Object
    function ojectTask(idTask, nameTask){
        this.idTask = idTask,
        this.nameTask = nameTask
    }

    
    listTasks.querySelectorAll('li.task__content').forEach(function(item) {
        //push a new Object right here 
        tasks.push(new ojectTask(idTask, item.textContent))
        idTask++;
    })
      
    
    
    localStorage.setItem('taskList', JSON.stringify(tasks));
    
    console.log(tasks);
}