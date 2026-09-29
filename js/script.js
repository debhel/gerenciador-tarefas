document.addEventListener("DOMContentLoaded", function(){
    const formTarefa = document.getElementById('formTarefa');
    const listaTarefas = document.getElementById('listaTarefas');
    let vetorTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    function salvarDados(){
        localStorage.setItem("tarefas", JSON.stringify(vetorTarefas));
    }

    function exibirTarefa(){
        for(let r = 0; r < vetorTarefas.length; r++){
            const addLi = document.createElement('li');
            const vetorPosicao = vetorTarefas[r];
        
            addLi.textContent = vetorPosicao.descricao + " " + 
            vetorPosicao.categoria + " " + vetorPosicao.prioridade + " " + 
            vetorPosicao.prazo + " " + vetorPosicao.situacao;
        
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
    });
});