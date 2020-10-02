$(function() {
    
    function exibir_comidas() {
        $.ajax({
            url: 'http://localhost:5000/listar_comidas',
            method: 'GET',
            dataType: 'json',
            success: listar_comidas,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar_comidas (resposta) {
            $('#corpoTabelaComidas').empty();
            mostrar_conteudo('TabelaComidas');
            for (var i in resposta) {
                lin = '<tr id="linha_'+resposta[i].id+'">' + 
                '<td>' + resposta[i].nome + '</td>' + 
                '<td>' + resposta[i].sabor + '</td>' + 
                '<td>' + resposta[i].origem + '</td>' + 
                '<td>' + resposta[i].dificuldade_de_preparo + '</td>' + 
                '<td>' + resposta[i].nota + '</td>' + 
                '<td><a href=# id="excluir_' + resposta[i].id + '" ' + 
                  'class="excluir_comida"><img src="imagens/excluir.png" '+
                  'alt="Excluir comida" title="Excluir comida" width=40px></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaComidas').append(lin);
            }
        }
    }

    function mostrar_conteudo(identificador) {
        $("#TabelaComidas").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        $("#"+identificador).removeClass('invisible');      
    }

    $(document).on("click", "#linkListarComidas", function() {
        exibir_comidas();
    });

    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    $(document).on("click", "#btnIncluirComidas", function validarform() {
        if ((document.getElementById("campoNome").value.length < 2) || (document.getElementById("campoSabor").value.length < 2) || 
        (document.getElementById("campoOrigem").value.length < 2) || (document.getElementById("campoDificuldadeDePreparo").value.length < 2) ||
        (document.getElementById("campoNota").value.length < 1)) {
            alert('Por favor, preencha todos os campos');
        } 
        else {
            nome = $("#campoNome").val();
            sabor = $("#campoSabor").val();
            origem = $("#campoOrigem").val();
            dificuldade_de_preparo = $("#campoDificuldadeDePreparo").val();
            nota = $("#campoNota").val();
            var dados = JSON.stringify({ nome: nome, sabor: sabor, origem: origem, dificuldade_de_preparo: dificuldade_de_preparo, nota: nota});
            $.ajax({
                url: 'http://localhost:5000/incluir_comida',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: dados,
                success: comidaIncluida,
                error: erroAoIncluir
            });
        }
        function comidaIncluida (retorno) {
            if (retorno.resultado == "ok") {
                alert("Comida incluída com sucesso!");
                $("#campoNome").val("");
                $("#campoSabor").val("");
                $("#campoOrigem").val("");
                $("#campoDificuldadeDePreparo").val("");
                $("#campoNota").val("");
            } 
            else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $('#modalIncluirComidas').on('hide.bs.modal', function (e) {
        if (! $("#TabelaComidas").hasClass('invisible')) {
            exibir_comidas();
        }
    });

    mostrar_conteudo("conteudoInicial");


    $(document).on("click", ".excluir_comida", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_";
        var id_comida = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/excluir_comida/'+id_comida,
            type: 'DELETE', 
            dataType: 'json', 
            success: comidaExcluida, 
            error: erroAoExcluir
        });
        function comidaExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + id_comida).fadeOut(1000, function(){
                    alert("Comida removida com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });

});