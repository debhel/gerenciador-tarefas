document.addEventListener("DOMContentLoaded", function(){
    const formTarefa = document.getElementById('formTarefa');
    const listaTarefas = document.getElementById('listaTarefas');
    const tarefasExistentes = document.querySelector(".tarefasExistentes");
    let vetorTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    function salvarDados(){
        localStorage.setItem("tarefas", JSON.stringify(vetorTarefas));
    }

    function exibirTarefa(){

        if(vetorTarefas.length == 0 && document.getElementById('semTarefa') == null){
            let addTexto = document.createElement('p');
            
            addTexto.setAttribute("id", "semTarefa");
            addTexto.textContent = "Nenhuma tarefa foi cadastrada";
            
            tarefasExistentes.appendChild(addTexto);
        }else{
            if(vetorTarefas.length > 0 && document.getElementById('semTarefa') != null){
                document.getElementById('semTarefa').remove();
            }
        }
        
        listaTarefas.innerHTML = "";

        for(let r = 0; r < vetorTarefas.length; r++){
            const addLi = document.createElement('li');
            const vetorPosicao = vetorTarefas[r];
            let status;

            if(vetorPosicao.situacao == false){
                status = "Pendente";
            }else{
                status = "Concluída";
            }
        
            addLi.textContent = vetorPosicao.descricao + " " + 
            vetorPosicao.categoria + " " + vetorPosicao.prioridade + " " + 
            vetorPosicao.prazo + " " + status;

            listaTarefas.appendChild(addLi);
        }
    }

    exibirTarefa();

    formTarefa.addEventListener('submit', function(e){
        e.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const categoria = document.getElementById('categoria').value;
        const prioridade = document.getElementById('prioridade').value;
        const prazo = document.getElementById('prazo').value;

        const objetoTarefa = {
            descricao: descricao,
            categoria: categoria,
            prioridade: prioridade,
            prazo: prazo,
            situacao: false
        }
        
        vetorTarefas.push(objetoTarefa);
        salvarDados();
        exibirTarefa();
        formTarefa.reset();
    });
});