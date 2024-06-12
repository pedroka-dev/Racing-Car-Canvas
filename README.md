# Introduction

This is a simple top down 2D car game made in HTML Canvas + Javascript, where you control a car with the keyboard arrows keys. The main goal of this PoC (Proof of Concept) is to test creation, movement, rotation, translation and even collision detection of geometry shapes on Canvas. 

Made in less than 8 consecutive hours of work, in a caffeine-fuelled programming binge.

Because of such small time scope and the limited features of HTML Canvas, many smart hacks and workahounds were necessary to make this project work. And it does works! But such hacks and workahound also makes the code pretty abstract and hard to read. 


<details>
<summary>Introdução (Português)</summary>

Esse é um simples jogo de carro top down 2D feito em HTML Canvas + Javacript, onde você controla o carro utilizando as teclas de seta do teclado. O objetivo principal deste PoC (Prova de Conceito) é testar a criação, movimento, rotação, translação e até mesmo detecção de colisão de formas geométricas no Canvas. 
</details>
  
![alt text](https://github.com/pedro-ca/car-canvas/blob/main/car%20canvas%20screenshot.JPG)

---

# Features
  - Car accelaretes over time, instead of having just a fixed velocity.
  - Car slowdown over time when "↑ Up" and "↓ Down" are not being pressed over time, instead of just stopping imediatly. 
  - Collision detection: detects when the car is not on the track. While off road, the car is considerably slower.
  - Speedometer on the left, displaying the car's current velocity in kilometers per hour. 
  - *A very stilish music playing on the background from the anime "Initial D": "Manoel - Gas Gas Gas" :)*

<details>
<summary>Funcionalidades (Português)</summary>

  - O carro acelera com o tempo, ao invés de ter somente uma velocidade fixa.
  - O carro desacelera "↑ Up" e "↓ Down" não estão sendo pressionao com o tempo, ao invés de só parar imediatamente. 
  - Detecção de colisão: detecta quando o carro não está na pista. Enquanto estiver fora da estrada, o carro é consideravelmente mais devagar.
  - Velocímetro do lado, mostrando a velocidade do carro em kilometros por hora.
  - *Uma musica muito estilosa tocando no fundo vinda do anime "Initial D": "Manoel - Gas Gas Gas" :)* 
</details>

---

# Controls
  - The "↑ Up" arrow key accelerates the car foward.
  - The "↓ Down" arrow key accelerates the car backwards.
  - The "→ Right" and "← Left" arrow keys rotates the car.

<details>
<summary>Controles (Português)</summary>
  
  - A tecla de seta "↑ Up" acelera o carro para frente.
  - A tecla de seta "↓ Down" acelera o carro para trás.
  - As teclas de seta "→ Right" e "← Left" rotacionam o carro.
</details>
