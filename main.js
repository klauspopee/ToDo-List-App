// Tasks
// [1] use sweet alert if input is empty  [Done]
// [2] check if the task is alredy exists [Done]
// [3] creat delete all tasks button      [Done]
// [4] creat finished all button          [Done]
// [5] add tasks to local storage         [X]



// setting up variables
let Input = document.querySelector('.add-task input');
let AddBtn = document.querySelector('.add-task .plus');
let tasksContainer = document.querySelector('.tasks-content');
let tasksCount = document.querySelector('.tasks-count span');
let tasksFinished = document.querySelector('.tasks-completed span');
let deleteAllBtn = document.querySelector('.delete-all');
let allFinishedBtn = document.querySelector('.all-finished'); 

let arryOfTasks = [];


//Focus on input feild
window.onload = function () {
    Input.focus()
    
}

if (localStorage.getItem('tasks')) {
    arryOfTasks = JSON.parse(window.localStorage.getItem('tasks'));

    // remove no tasks message
    let noTasksMsg = document.querySelector('.no-tasks-message');
    

    // creat task elements from local storage 
    if (arryOfTasks.length != 0) {

        noTasksMsg.remove();


        arryOfTasks.forEach(function(task) {
            // creat span  element
            let mainSpan = document.createElement('span');

            //creat delete btn 
            let deleteBtn = document.createElement('span');

            // creat main span text
            let text = document.createTextNode(task.content);

            // creat the delete btn text
            let deleteText = document.createTextNode('Delete');

            // add text to span 
            mainSpan.appendChild(text);

            //add class to span
            mainSpan.classList.add('task-box')

            //add text to delete btn 
            deleteBtn.appendChild(deleteText);

            // add class to delete btn
            deleteBtn.className = 'delete';

            // add delete btn to main span 
            mainSpan.appendChild(deleteBtn);
            // add main span to task container
            tasksContainer.appendChild(mainSpan); 
            calculateTasks();
        })
    }
    
}




// adding the task
AddBtn.onclick = function () {

    //if input is empty
    if (Input.value === '') {
        // [1] add sweet alert here
        Swal.fire("Input Is Empty")
    } else {
        let noTasksMsg = document.querySelector('.no-tasks-message');

        // check if span with not tasks msg exist
        if (document.body.contains(document.querySelector('.no-tasks-message'))) {

            // remove no tasks msg
            noTasksMsg.remove();
        }

        // check if the task alredy exists
        taskExist(Input.value)


        // creat span  element
        let mainSpan = document.createElement('span');

        //creat delete btn 
        let deleteBtn = document.createElement('span');

        // creat main span text
        let text = document.createTextNode(Input.value);

        // creat the delete btn text
        let deleteText = document.createTextNode('Delete');

        // add text to span 
        mainSpan.appendChild(text);

        //add class to span
        mainSpan.classList.add('task-box')

        //add text to delete btn 
        deleteBtn.appendChild(deleteText);

        // add class to delete btn
        deleteBtn.className = 'delete';

        // add delete btn to main span 
        mainSpan.appendChild(deleteBtn);



        // creat the inique id 
        let uniqueId = document.createAttribute('id');
        uniqueId.value = Date.now()

        // add attr to main span
        mainSpan.setAttributeNode(uniqueId)


        // add task to the container 
        tasksContainer.appendChild(mainSpan); 

    

        // add task to arry of tasks
        addToArryTasks(Input.value,uniqueId.value);

        

        // empty the input 
        Input.value = ''

        Input.focus();

        // calculate tasks
        calculateTasks();
    }
    
};

document.addEventListener('click', function (e) {

    //delete task
    if (e.target.className == 'delete') {

        // remove current task
        e.target.parentNode.remove();
        // remove task from arry
        
        deletTaskWithThisId(e.target.parentElement.getAttribute('id'))

        localStorage.setItem('tasks', JSON.stringify(arryOfTasks))

        // check number of tasks inside the container
        if (tasksContainer.childElementCount == 0) {
            creatNoTasks();
        }
    }


    if (e.target.classList.contains('task-box')) {
        
        // toggle class 'finised'
        e.target.classList.toggle('finished');
        
    }

    //calculate tasks
    calculateTasks();

})

// function to creat no tasks message
function creatNoTasks () {
    
    // creat no tasks span element
    let msgSpan = document.createElement('span');

    // creat the text message
    let textMsg = document.createTextNode('No Tasks To Show');

    // add the text to the span element 
    msgSpan.appendChild(textMsg);

    // add class to msg span
    msgSpan.className = 'no-tasks-message'

    // apend the msg span element to the task container
    tasksContainer.appendChild(msgSpan);
}

// function to calculate tasks  
function calculateTasks () {

    // calculate tasks
    tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;

    
    // // calculate Completed tasks
    tasksFinished.innerHTML = document.querySelectorAll('.tasks-content .finished').length;
}


// function to check if the task alredy exists 
function taskExist (text) {
        let taskBoxes = document.querySelectorAll('.task-box'); 
        for(i = 0 ; i < taskBoxes.length; i++) {
            if (taskBoxes[i].firstChild.textContent === text) {
                Swal.fire('task alredy exists');
            }
        } 
}

// all finished button 
allFinishedBtn.onclick = function () {
    document.querySelectorAll('.task-box').forEach(function(task) {
        task.classList.add('finished')
    })
    arryOfTasks.forEach(function(task) {
        task.state = 'finished'
    })
    localStorage.setItem('tasks', JSON.stringify(arryOfTasks))
}

// delete all button 
deleteAllBtn.onclick = function () {
    tasksContainer.replaceChildren();
    localStorage.clear();
    creatNoTasks();
}

// add task to tasks arry and local storage function
function addToArryTasks (taskText,taskId) {
    let task = {
        content: taskText,
        id : taskId,
        state: '',
    }

    
    arryOfTasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(arryOfTasks))
}

// delete task from arry based on its id 
function deletTaskWithThisId (taskId) {
    arryOfTasks = arryOfTasks.filter((task) => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(arryOfTasks))
}

