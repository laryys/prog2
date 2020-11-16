from config import *
from classe import Comida, Ranking, Classificacao 

@app.route("/")
def inicio():
    return 'Sistema para cadastrar comidas. '+\
        '<a href="/listar_comidas">Listar Comidas</a>'

@app.route("/listar_comidas")
def listar_comidas():
    comidas = db.session.query(Comida).all()
    retorno = []
    for i in comidas:
        retorno.append(i.json())
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/incluir_comida", methods=['post'])
def incluir_comida():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try:
        nova = Comida(**dados)
        db.session.add(nova)
        db.session.commit()
    except Exception as e: 
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/excluir_comida/<int:comida_id>", methods=['DELETE'])
def excluir_comida(comida_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Comida.query.filter(Comida.id == comida_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 

@app.route("/listar/<string:classe>")
def listar(classe):
    if classe == "Ranking":
      dados = db.session.query(Ranking).all()
    elif classe == "Comida":
      dados = db.session.query(Comida).all()
    elif classe == "Classificacao":
      dados = db.session.query(Classificacao).all()
    lista_jsons = [ x.json() for x in dados ]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)