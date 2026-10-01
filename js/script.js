document.addEventListener("DOMContentLoaded", function(){
    const formTarefa = document.getElementById('formTarefa');
    const listaTarefas = document.getElementById('listaTarefas');
    const tarefasExistentes = document.querySelector(".tarefasExistentes");
    const fSituacao = document.getElementById('filtroSituacao');
    const fCategoria = document.getElementById('filtroCategoria');

    let vetorTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    fSituacao.addEventListener('change', function(e){
        console.log(fSituacao.value);                //testando
    });

    fCategoria.addEventListener('change', function(e){
        console.log(fCategoria.value);               //testando
    });

    function salvarDados(){
        localStorage.setItem("tarefas", JSON.stringify(vetorTarefas));
    }

    exibirTarefas();

    const excluirTarefa = function excluirTarefa(e){
        let tarefaID = e.target.id;
        let recebeR = 0;

        for(let r = 0; r < vetorTarefas.length; r++){
            if(vetorTarefas[r].id == tarefaID){
                recebeR = r;
                break;
            }
        }
        vetorTarefas.splice(recebeR,1);
        salvarDados();
        exibirTarefas();
    }

   /* function filtrarTarefas(){
        desenvolver a função dos filtros
    }*/

    function exibirTarefas(){

        if(vetorTarefas.length == 0 && document.getElementById('semTarefa') == null){
            let addTexto = document.createElement('p');
            
            addTexto.setAttribute("id", "semTarefa");
            addTexto.textContent = "Nenhuma tarefa está cadastrada";
            
            tarefasExistentes.appendChild(addTexto);
        }else{
            if(vetorTarefas.length > 0 && document.getElementById('semTarefa') != null){
                document.getElementById('semTarefa').remove();
            }
        }
        
        listaTarefas.innerHTML = "";

        for(let r = 0; r < vetorTarefas.length; r++){
            const addLi = document.createElement('li');
            const botaoExcluir = document.createElement('button');
            const botaoConcluir = document.createElement('button');
            const vetorPosicao = vetorTarefas[r];
            let status;

            botaoExcluir.setAttribute("id", vetorTarefas[r].id);
            botaoConcluir.setAttribute("id", vetorTarefas[r].id);

            if(vetorPosicao.situacao == false){
                status = "Pendente";
            }else{
                status = "Concluida";
            }

            addLi.textContent = vetorPosicao.descricao + " \u2022 " + 
            vetorPosicao.categoria + " Prioridade: " + vetorPosicao.prioridade + " " + 
            vetorPosicao.prazo + " " + status;
            botaoConcluir.textContent = "Concluir";
            botaoExcluir.textContent = "Excluir";

            listaTarefas.appendChild(addLi);
            addLi.appendChild(botaoConcluir);
            addLi.appendChild(botaoExcluir);

            botaoExcluir.addEventListener("click", excluirTarefa);
            botaoConcluir.addEventListener("click", function(e){
                
                if(vetorPosicao.situacao == false){
                    vetorPosicao.situacao = true;
                    botaoConcluir.textContent = "Desmarcar";
                }else{
                    vetorPosicao.situacao = false;
                }
                    salvarDados();
                    exibirTarefas();
            });
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