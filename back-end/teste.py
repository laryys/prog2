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
    c5 = Comida(nome = "Churrasco", sabor = "Carne", 
    origem = "Brasil", dificuldade_de_preparo = "Difícil", 
    nota = 9)

    t1 = Classificacao(titulo = "melhor do mundo",  data_classificacao = "23/01/2018", categoria = "massa", comida = c1)
    t2 = Classificacao(titulo = "melhor textura", data_classificacao = "12/07/2018", categoria = "taco", comida = c2)
    t3 = Classificacao(titulo = "melhor sobremesa", data_classificacao = "16/05/2018", categoria = "torta", comida = c3)
    t4 = Classificacao(titulo = "melhor sabor", data_classificacao = "11/10/2019", categoria = "grãos", comida = c4)
    t5 = Classificacao(titulo = "melhor prato", data_classificacao = "23/12/2019", categoria = "cerne", comida = c5)

    r1 = Ranking(posicao = 1, autor = "Massimo Bottura", comida = c1)
    r2 = Ranking(posicao = 2, autor = "Jody Adams", comida = c3)
    r3 = Ranking(posicao = 3, autor = "Alex Atala", comida = c5)

    db.session.add(c1)
    db.session.add(c3)
    db.session.add(c5)

    db.session.add(t1)
    db.session.add(t3)
    db.session.add(t5)

    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)

    db.session.commit()

    print(c1.json())
    print(c3.json())
    print(c5.json())

    print(t1.json())
    print(t3.json())
    print(t5.json())
    
    print(r1.json())
    print(r2.json())
    print(r3.json())

