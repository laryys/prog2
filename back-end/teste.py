from classe import *
import os

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    r1 = Ranking(posicao = 1, autor = "Massimo Bottura")
    r2 = Ranking(posicao = 2, autor = "Enrique Olvera")
    r3 = Ranking(posicao = 3, autor = "Jody Adams")
    r4 = Ranking(posicao = 4, autor = "Shin Koike")
    r5 = Ranking(posicao = 5, autor = "Alex Atala")

    c1 = Comida(nome = "Lasanha", sabor = "4 queijos", 
    origem = "Itália", dificuldade_de_preparo = "Médio", 
    nota = 9.5, ranking_id = 1)
    c2 = Comida(nome = "Taco", sabor = "Carne ao molho", 
    origem = "México", dificuldade_de_preparo = "Médio", 
    nota = 8.8, ranking_id = 2)
    c3 = Comida(nome = "Torta", sabor = "Maçã", 
    origem = "EUA", dificuldade_de_preparo = "Fácil", 
    nota = 9, ranking_id = 3)
    c4 = Comida(nome = "Sushi", sabor = "Uramaki", 
    origem = "Japão", dificuldade_de_preparo = "Difícil", 
    nota = 9, ranking_id = 4)
    c5 = Comida(nome = "Churrasco", sabor = "Carne", 
    origem = "Brasil", dificuldade_de_preparo = "Difícil", 
    nota = 9, ranking_id = 5)

    t1 = Classificacao(titulo = "melhor do mundo", categoria = "massa", comida_id = 1)
    t2 = Classificacao(titulo = "melhor textura", categoria = "taco", comida_id = 2)
    t3 = Classificacao(titulo = "melhor sobremesa", categoria = "torta", comida_id = 3)
    t4 = Classificacao(titulo = "melhor sabor", categoria = "grãos", comida_id = 4)
    t5 = Classificacao(titulo = "melhor prato", categoria = "cerne", comida_id = 5)

    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.add(r4)
    db.session.add(r5)

    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)

    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)

    db.session.commit()
    
    print(r1.json())
    print(r2.json())
    print(r3.json())
    print(r4.json())
    print(r5.json())

    print(c1.json())
    print(c2.json())
    print(c3.json())
    print(c4.json())
    print(c5.json())

    print(t1.json())
    print(t2.json())
    print(t3.json())
    print(t4.json())
    print(t5.json())