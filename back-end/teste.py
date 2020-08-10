from classe import *
import os

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    c1 = Comida(nome = "Lasanha", sabor = "4 queijos", 
    origem = "Itália", dificuldade_de_preparo = "Médio", 
    nota = 9.5)
    c2 = Comida(nome = "Taco", sabor = "Carne ao molho", 
    origem = "México", dificuldade_de_preparo = "Médio", 
    nota = 8.8)
    c3 = Comida(nome = "Torta", sabor = "Maçã", 
    origem = "EUA", dificuldade_de_preparo = "Fácil", 
    nota = 9)
    c4 = Comida(nome = "Sushi", sabor = "Uramaki", 
    origem = "Japão", dificuldade_de_preparo = "Difícil", 
    nota = 9)

    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.commit()
    
    print(c1.json())
    print(c2.json())
    print(c3.json())
    print(c4.json())