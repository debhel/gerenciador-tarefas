document.addEventListener("DOMContentLoaded", function(){    
    const formTarefa = document.getElementById('formularioTarefa');

    formTarefa.addEventListener('submit', function(e){
       console.log("submeteu");

       const descricao = document.getElementById('descricao').value;
       console.log(descricao);
       
       const categoria = document.getElementById('categoria').value;
       console.log(categoria);

       const prioridade = document.getElementById('prioridade').value;
       console.log(prioridade);

        const prazo = document.getElementById('prazo').value;
        console.log(prazo);
        e.preventDefault();
    });
});