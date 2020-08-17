$( document ).ready(function() {
    
    $("#conteudoInicial").removeClass("invisible");

    $("#link_listar_comidas").click(function(){
       
        $.ajax({
            url: "http://localhost:5000/listar_comidas",
            method: "GET",
            dataType: "json",
            success: listar_comidas,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
    });

        function listar_comidas (resultado) {
            linhas = ""
            // percorrer a lista de comidas retornadas; 
            for (var i in resultado) { 
                lin = "<tr>" + // montar uma linha da tabela de comidas
                "<td>" + resultado[i].nome + "</td>" + 
                "<td>" + resultado[i].sabor + "</td>" + 
                "<td>" + resultado[i].origem + "</td>" +
                "<td>" + resultado[i].dificuldade_de_preparo + "</td>" +
                "<td>" + resultado[i].nota + "</td>" + 
                "</tr>";
                //adicionar linha em um acumulador
                linhas = linhas + lin;
            }
            
            // colocar as linhas na tabela
            $("#corpoTabelaComidas").html(linhas);

            //esconder elementos da tela
            $("#conteudoInicial").addClass("invisible");
            $("#TabelaComidas").addClass("invisible");
            
            //exibir tabela
            $("#TabelaComidas").removeClass("invisible");
        }
    });
  });