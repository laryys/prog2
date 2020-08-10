from config import *
from classe import Comida

@app.route("/")
def inicio():
    return 'Sistema para cadastrar comidas. '+\
        '<a href="/listar_comidas">Listar Comidas</a>'

@app.route("/listar_comidas")
def listar_comidas():
    comidas = db.session.query(Comida).all()
    comida_em_json = [ x.json() for x in comidas ]
    resposta = jsonify(comida_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)