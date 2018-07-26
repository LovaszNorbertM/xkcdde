import * as THREE from 'three';
export default function SceneSubject(scene) {

  const radius = 2;
  const mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(radius, 30, 30), new THREE.MeshPhongMaterial({ color: 0x9da5aa, shininess: 57 }));

  this.setInitPos = (init) => {
    mesh.position.set(init.x, init.y, init.z);
  }


  scene.add(mesh);

  this.update = (time, x) => {
    if (x === "cos") {
      let pozx = Math.cos(time) + 0.5;
      let pozy = Math.sin(time) + 1.5;
      let pozz = Math.cos(time * Math.PI) - 10;

      mesh.position.set(pozx, pozy, pozz);
    } else if (x === "sin") {
      let pozx = Math.sin(time) + 0.5;
      let pozy = Math.cos(time) + 1.5;
      let pozz = Math.sin(time * Math.PI) + 10;

      mesh.position.set(pozx, pozy, pozz);
    }


    // mesh.scale.set(scale,scale,scale);
  }
}