
AFRAME.registerComponent("enemy-fireballs", {
    init: function () {        
        setInterval(this.shootEnemyMonster, 2000)
    },
    shootEnemyMonster: function () {
       //Elegir la escena y guardarla en una variable
       var scene = document.querySelector("#scene");

       //Elegir a todos los mounstros
       var mounsters = document.querySelectorAll(".enemy");

       //Ciclo para crear bolas que disparen cada mounstro 
       for (var i = 0; i < mounsters.length; i++) {   
        
       //Crear entidad para bola de fuego
       var fireball = document.createElement("a-entity");
        
       //Atributo de clase para la bola
       fireball.setAttribute("class", "bolasFuego")

       //Atributo para añadir modelo fireball
       fireball.setAttribute("gltf-model", "./models/fireball/scene.gltf")
        
      //Atributo de cuerpo dinamico con masa 0
      fireball.setAttribute("dynamic-body", {
        shape:"sphere",
        mass:"0"
      })
        
      //Obtener el atributo de posición de cada mounstro 
      var pos=mounsters[i].getAttribute("position")    
        
    //Atributo de posición según la del mounstro 
    fireball.setAttribute("position", {
        x: pos.x + 1.5,
        y: pos.y + 3.5,
        z: pos.z
    });

    //Atributo de escala con 0.05 para todos los ejes
    fireball.setAttribute("scale", {x:0.05, y:0.05, z:0.05})
       
        //Agregar la bola como hija de la escena
        scene.appendChild(fireball)
        
        //Crear 2 vectores uno para jugador otro para enemigo
        var vector1 = new THREE.Vector3()
        var vector2 = new THREE.Vector3()
        
       //Obtener al enemigo y al jugador como objetos 3D y guardarlos en variables
       var enemy = mounsters[i].object3D
       var player = document.querySelector("#weapon").object3D

      //Obtener la dirección a la que apunta la cámara de cada uno como vector Three.js
      enemy.getWorldPosition(vector1)
      player.getWorldPosition(vector2)
        
    //Vector para guardar el resultado de la resta de los 2 vectores anteriores
    var vectorResultado=new THREE.Vector3()
    
    //Resta usando subVectors y normalize
    vectorResultado.subVectors(vector1, vector2).normalize()
    
     //Dar velocidad e incrementarla en 20
     fireball.setAttribute("velocity", vectorResultado.multiplyScalar(20))  

        /******************************************************************************************* */

        //Obtener el valor de cuantas vidas tiene el jugador
        var vidas=document.querySelector("#countLife")
        var playerLife=parseInt(vidas.getAttribute("text").value)

        //eventos de colisión con balas enemigas(fireball es el nombre de la bola de fuego)
        fireball.addEventListener("collide", function (e) {
           
            if (e.detail.body.el.id === "weapon") {               
                if (playerLife > 0) {
                    //Restar vidas y actualizar texto
                    playerLife -=1
                    vidas.setAttribute("text", {
                        value:playerLife
                    })
                }
                if (playerLife <= 0) {
                    //mostrar texto de over
                    var textOver= document.querySelector("#over")
                    textOver.setAttribute("visible", true)
                    //eliminar monstruos
                    var moun = document.querySelectorAll(".enemy");
                    for(var i=0; i<moun.length; i++){
                        scene.removeChild(moun[i])
                    }
                }

            }
        });
      }
    
    },
    

});
