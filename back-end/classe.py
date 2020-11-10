from config import *

class Ranking(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    posicao = db.Column(db.Integer)
    autor = db.Column(db.String(254))

    def __str__(self):
        return str(self.id)+", " + str(self.posicao) + ", " +\
            self.autor

    def json(self):
        return ({
            "id":self.id,
            "posicao":self.posicao,
            "autor": self.autor,
        })

class Comida(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    sabor = db.Column(db.String(254))
    origem = db.Column(db.String(254))
    dificuldade_de_preparo = db.Column(db.String(254))
    nota = db.Column(db.Integer)
    ranking_id = db.Column(db.Integer, db.ForeignKey(Ranking.id))
    ranking = db.relationship("Ranking")

    def __str__(self):
        s = f"Comida {self.nome}"
        if self.ranking_id != None:
            s += f"na posição {self.posicao} feito(a) por {self.autor}" 
            return s

    def json(self):
        if self.ranking_id is None:
            return ({
                "id": self.id,
                "nome": self.nome,
                "sabor": self.sabor,
                "origem": self.origem,
                "dificuldade_de_preparo": self.dificuldade_de_preparo,
                "nota": self.nota
        })
        else:
            return ({
                "id": self.id,
                "nome": self.nome,
                "sabor": self.sabor,
                "origem": self.origem,
                "dificuldade_de_preparo": self.dificuldade_de_preparo,
                "nota": self.nota,
                "ranking": self.ranking.json()
            })

class Titulo(db.Model):

    id = db.Column(db.Integer, primary_key=True) 
    nomeacao = db.Column(db.String(254)) 
    categoria = db.Column(db.String(254))
    comida_id = db.Column(db.Integer, db.ForeignKey(Comida.id), nullable=False)
    comida = db.relationship("Comida")

    def __str__(self): 
        return str(self.id)+", " + self.nomeacao + ", " +\
            self.categoria

    def json(self):
        return ({
            "id": self.id,
            "nomeacao": self.nomeacao,
            "categoria": self.categoria,
            "comida": self.comida.json()
        }) 
