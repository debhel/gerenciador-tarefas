document.addEventListener("DOMContentLoaded", function(){
    const formTarefa = document.getElementById('formTarefa');
    const listaTarefas = document.getElementById('listaTarefas');
    const tarefasExistentes = document.querySelector(".tarefasExistentes");
    let vetorTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    function salvarDados(){
        localStorage.setItem("tarefas", JSON.stringify(vetorTarefas));
    }

    const excluirTarefa = function excluirTarefa(e){
        let tarefaID = e.target.id;
        let recebeR = 0; 
        
        for(let r = 0; r< vetorTarefas.length; r++){
            if(vetorTarefas[r].id == tarefaID){
                recebeR = r;
                break;
            }
        }
        vetorTarefas.splice(recebeR,1);
        salvarDados();
        exibirTarefas();
    }

    function exibirTarefas(){

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
            const addBotao = document.createElement('button');
            const vetorPosicao = vetorTarefas[r];
            let status;

            addBotao.setAttribute("id", vetorTarefas[r].id);

            if(vetorPosicao.situacao == false){
                status = "Pendente";
            }else{
                status = "Concluída";
            }
        
            addLi.textContent = vetorPosicao.descricao + " " + 
            vetorPosicao.categoria + " " + vetorPosicao.prioridade + " " + 
            vetorPosicao.prazo + " " + status;
            addBotao.textContent = "X";

            addBotao.addEventListener("click", excluirTarefa);

            listaTarefas.appendChild(addLi);
            addLi.appendChild(addBotao);
        }
    }

    exibirTarefas();

    formTarefa.addEventListener('submit', function(e){
        e.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const categoria = document.getElementById('categoria').value;
        const prioridade = document.getElementById('prioridade').value;
        const prazo = document.getElementById('prazo').value;
        const idTarefa = crypto.randomUUID();

        const objetoTarefa = {
            descricao: descricao,
            categoria: categoria,
            prioridade: prioridade,
            prazo: prazo,
            situacao: false,
            id: idTarefa
        }
        
        vetorTarefas.push(objetoTarefa);
        salvarDados();
        exibirTarefas();
        formTarefa.reset();
    });
});