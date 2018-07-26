import * as THREE from 'three';
import * as MeshLine from 'three.meshline';
export default  function LineSubject(scene){
  this.setInitPos=(init)=>{

  }
  let geomwtry = new THREE.Geometry();
  for(let i = 0; i<2;i++){
    let v = new THREE.Vector3(scene.children[i+2].position.x,scene.children[i+2].position.y,scene.children[i+2].position.z);
    geomwtry.vertices.push(v);
  }
  let line = new MeshLine.MeshLine();
  line.setGeometry(geomwtry);

  let material = new MeshLine.MeshLineMaterial({color:new THREE.Color({color: 0x9da5aa})});
  const mesh = new THREE.Mesh(line.geometry, material);
  scene.add(mesh);
  this.update=(time)=>{

  }
}
