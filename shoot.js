AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.2,
        });

        bullet.setAttribute("material", "color", "blue");

        var cam = document.querySelector("#camera-rig");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y+1.6,
          z: pos.z-4.4,
        });

        var camera = document.querySelector("#camera").object3D;

        //obtener la dirección de la cámara como vector Three.js 
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //establecer la velocidad y su dirección.
        bullet.setAttribute("velocity", direction.multiplyScalar(-50));

        var scene = document.querySelector("#scene");

        //establecer la bala como entidad dinámica
        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "20",
        });

        bullet.setAttribute("visible", true);

        //agregar el evento de escucha de la colisión a la bala
        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);

        //sonido de disparo
        this.shootSound();
      }
    });
  },
  removeBullet: function (e) {
    var scene = document.querySelector("#scene");
    //elemento de bala
    var element = e.detail.target.el;

    //elemento que es golpeado
    var elementHit = e.detail.body.el;
    
    if(elementHit.id.includes("enemy")){     
      //Elegir el texto que tiene el numero de mounstros a eliminar
      var conteoM = document.querySelector("#countMounsters")
      var textoMConteo = parseInt(conteoM.getAttribute("text").value)
      
      //Disminuirlo en 1
      textoMConteo -= 1
     
      //Actualizar el texto
      conteoM.setAttribute("text", {
        value:textoMConteo
      })
      
      //SI el conteo de mounstros ya esta en 0
      if (textoMConteo === 0) {
        //Hacer visible el texto de ganaste creado en el index
        var textoGanar= document.querySelector("#completed")
        textoGanar.setAttribute("visible", true)          
      }
      scene.removeChild(elementHit);
    }

    //eliminar evento de escucha
    element.removeEventListener("collide", this.removeBullet);

    //eliminar las balas de la escena      
    scene.removeChild(element);
  },
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});

