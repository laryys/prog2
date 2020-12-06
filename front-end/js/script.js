$(function() {
    
    function exibir_comidas() {
        mostrar_conteudo('TabelaComidas')
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
            mostrar_conteudo('cadastroComidas'); 
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
        $("#cadastroComidas").addClass('invisible');
        $("#cadastroRanking").addClass('invisible');
        $("#cadastroClassificacao").addClass('invisible');
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
        if (! $("#cadastroComidas").hasClass('invisible')) {
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

    function exibir_ranking() {
        $.ajax({
            url: 'http://localhost:5000/listar_ranking',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });

        function listar (ranking) {
            $('#corpoTabelaRanking').empty();
            mostrar_conteudo("cadastroRanking");      
            for (var i in ranking) { 
                lin = '<tr id="linha_ranking_'+ranking[i].id+'">' + 
                '<td>' + ranking[i].posicao + '</td>' + 
                '<td>' + ranking[i].autor + '</td>' + 
                // dados da comida
                '<td>' + ranking[i].comida.nome + '</td>' + 
                '<td>' + ranking[i].comida.sabor + '</td>' + 
                '<td>' + ranking[i].comida.origem + '</td>' + 
                '<td>' + ranking[i].comida.dificuldade_de_preparo + '</td>' + 
                '<td>' + ranking[i].comida.nota + '</td>' + 
                '<td><a href=# id="excluir_ranking_' + ranking[i].id + '" ' + 
                    'class="excluir_ranking"><img src="imagens/excluir.png" '+
                    'alt="Excluir ranking" title="Excluir ranking"  width=40px></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaRanking').append(lin);
            }
        }
    }

    $(document).on("click", "#linkListarRanking", function() {
        exibir_ranking();
    });

    function exibir_classificacao() {
        $.ajax({
            url: 'http://localhost:5000/listar_classificacao',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function listar (classificacao) {
            $('#corpoTabelaClassificacao').empty();
            mostrar_conteudo("cadastroClassificacao");      
            for (var i in classificacao) { 
                lin = '<tr id="linha_classificacao_'+classificacao[i].id+'">' + 
                '<td>' + classificacao[i].titulo + '</td>' + 
                '<td>' + classificacao[i].categoria + '</td>' + 
                '<td>' + classificacao[i].data_classificacao + '</td>' + 
                // dados da comida
                '<td>' + classificacao[i].comida.nome + '</td>' + 
                '<td>' + classificacao[i].comida.sabor + '</td>' + 
                '<td>' + classificacao[i].comida.origem + '</td>' + 
                '<td>' + classificacao[i].comida.dificuldade_de_preparo + '</td>' + 
                '<td>' + classificacao[i].comida.nota + '</td>' + 
                '<td><a href=# id="excluir_classificacao_' + classificacao[i].id + '" ' + 
                    'class="excluir_classificacao"><img src="imagens/excluir.png" '+
                    'alt="Excluir classificacao" title="Excluir classificacao"  width=40px></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaClassificacao').append(lin);
            }
        }
    }

    $(document).on("click", "#linkListarClassificacao", function() {
        exibir_classificacao();
    });

});