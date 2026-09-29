let vetorTarefas = []; //a função salvarDados não tava pegando a variavel por estar fora do DOMContentLoaded

function salvarDados(){
    localStorage.setItem("tarefas", JSON.stringify(vetorTarefas));
}

document.addEventListener("DOMContentLoaded", function(){
    const formTarefa = document.getElementById('formTarefa');
    const listaTarefas = document.getElementById('listaTarefas');
    
    console.log("Antes de carregar:", vetorTarefas);
    console.log("O que está no localStorage:",
        localStorage.getItem("tarefas")
    );

    vetorTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    console.log("Depois de carregar:", vetorTarefas);

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
    });
});