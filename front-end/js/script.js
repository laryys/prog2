$(function() {
    
    $.ajax({
        url: 'http://localhost:5000/listar_comidas',
        method: 'GET',
        dataType: 'json', 
        success: listar, 
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    function listar (resposta) {
        for (var i in resposta) {
            lin = '<tr>' + 
                '<td>' + resposta[i].nome + '</td>' + 
                '<td>' + resposta[i].sabor + '</td>' + 
                '<td>' + resposta[i].origem + '</td>' + 
                '<td>' + resposta[i].dificuldade_de_preparado + '</td>' + 
                '<td>' + resposta[i].nota + '</td>' + 
                '</tr>';
            $('#corpoTabelaComida').append(lin);
        }
    }

});