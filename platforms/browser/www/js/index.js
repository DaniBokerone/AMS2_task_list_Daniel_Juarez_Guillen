document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    let id = 0; 
    let tasks = loadTasksFromLocalStorage(); 

    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            'OK': function () {
                var task_name = $('input[name="task_name"]').val(); 
                if (task_name) { 
                    id++;
                    generateListElement(id, task_name);

                    //Afegir tasca LocalStorage
                    tasks.push({ id: id, name: task_name });
                    saveTasksToLocalStorage(tasks);

                    $(this).dialog('close'); 
                    $('input[name="task_name"]').val(''); 
                } else {
                    alert("Afegeix un nom a la tasca, si us plau"); 
                }
            },
            'Cancel': function () {
                $(this).dialog('close'); 
            }
        }
    });

    $("#editDialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            'OK': function () {
                var task_name = $('input[name="edit_task_name"]').val(); 
                var taskId = $("#editDialog").data('taskId');
                if (task_name) {
                    updateListElement(taskId, task_name);

                    // Actualitzar tasques
                    const taskIndex = tasks.findIndex(t => t.id === taskId);
                    if (taskIndex !== -1) {
                        tasks[taskIndex].name = task_name;
                        saveTasksToLocalStorage(tasks);
                    }

                    $(this).dialog('close'); 
                    $('input[name="edit_task_name"]').val(''); 
                } else {
                    alert("Afegeix un nom a la tasca, si us plau"); 
                }
            },
            'Cancel': function () {
                $(this).dialog('close'); 
            }
        }
    });

    //Carregar tasques al inciar
    if (tasks.length > 0) {
        tasks.forEach(task => {
            generateListElement(task.id, task.name);
            id = Math.max(id, task.id); 
        });
    }

    $("#add_task").click(function () {
        $("#dialog").dialog("open");
    });

    //Generar element de la llista
    function generateListElement(taskId,texte) {
        
        var buttons = generateButtonList(taskId);
        var task = "<div id='task_id_" + taskId + "' class='list_element'><p class='text'>" + texte + "</p>" + buttons + "</div>";

        $('#tasques').append(task);
    }

    //Actualitzar elemets a la llista
    function updateListElement(taskId,texte){

        $('#task_id_' + taskId +' .text').html(texte);    
    }

    //Generar botons per la llista
    function generateButtonList(taskId) {
        var editBtn = "<button class='edit-task' data-task-id='" + taskId + "'>Editar</button>";
        
        var delBtn = "<button class='delete-task' data-task-id='" + taskId + "'>X</button>";

        return "<div>" + editBtn + delBtn + "</div>";
    }

    //Borrar tasca
    $(document).on('click', '.delete-task', function () {
        const taskId = $(this).data('task-id'); 
        $('#task_id_' + taskId).remove(); 

        //Borrar de LocalStorage
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasksToLocalStorage(tasks);
    });

    //Editar nom de la tasca
    $(document).on('click', '.edit-task', function () {
        const taskId = $(this).data('task-id'); 

        origText = $('#task_id_' + taskId +' .text').html(); 
        $("#editTaskName").html(origText);   

        $("#editDialog").data("taskId",taskId).dialog("open");
    });

    //Guardar taskes
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    //Carregar tasques
    function loadTasksFromLocalStorage(){
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    }

}
