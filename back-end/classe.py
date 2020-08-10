from config import *

class Comida(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    sabor = db.Column(db.String(254))
    origem = db.Column(db.String(254))
    dificuldade_de_preparo = db.Column(db.String(254))
    nota = db.Column(db.Integer)

    def __str__(self):
        return str(self.id)+", " + self.nome + ", " +\
            self.sabor + ", " + self.origem + ", " +\
            self.preparo + ", " + str(self.nota)

    def json(self):
        return ({
            "id": self.id,
            "nome": self.nome,
            "sabor": self.sabor,
            "origem": self.origem,
            "dificuldade de preparo": self.dificuldade_de_preparo,
            "nota": self.nota
        })