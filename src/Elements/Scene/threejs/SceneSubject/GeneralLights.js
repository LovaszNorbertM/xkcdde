import * as   THREE from 'three';
export default function GeneralLights(scene) {

	const light = new THREE.PointLight("#ffffff", 1);
	const light2 = new THREE.PointLight("#ffffff", 1);
	light2.position.y = -30;
	light.position.y = 30;
	scene.add(light2);
	scene.add(light);

	this.update = (time) => {
		light.intensity = (Math.sin(time) + 1.5) / 1.5;;
	}
}