document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    let id = 0; 

    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            'OK': function () {
                var task_name = $('input[name="task_name"]').val(); 
                if (task_name) { 
                    generateListElement(task_name);
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
                if (task_name) { 
                    generateListElement(task_name);
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

    $("#add_task").click(function () {
        $("#dialog").dialog("open");
    });

    //Generar element de la llista
    function generateListElement(texte) {
        id++; 
        
        var buttons = generateButtonList(id);
        var task = "<div id='task_id_" + id + "' class='list_element'><p>" + texte + "</p>" + buttons + "</div>";

        $('#tasques').append(task);
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
    });

    //Editar nom de la tasca
    $(document).on('click', '.edit-task', function () {
        const taskId = $(this).data('task-id'); 
        $("#editDialog").dialog("open");
         
    });
}
