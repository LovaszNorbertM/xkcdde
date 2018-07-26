import * as THREE from 'three';
import SceneSubject from './SceneSubject/SceneSubject';
import GeneralLights from './SceneSubject/GeneralLights';
import * as OrbitControls from 'three-orbitcontrols';
import LineSubject from './SceneSubject/LineSubjects';
export default function SceneManager(canvas) {

    const clock = new THREE.Clock();
    const radius = 30;
    let theta = 0;

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }
    const buildScene = () => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000");

        return scene;
    }

    const buildRender = ({ width, height }) => {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }
    const buildCamera = ({ width, height }) => {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 100;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.z = 20;
        camera.lookAt(0, 0, 0);

        return camera;
    }
    const createSceneSubjects = (scene) => {
        new GeneralLights(scene)
        const sceneSubjects = [
            new SceneSubject(scene),
            new SceneSubject(scene),
            new LineSubject(scene)
        ];
        sceneSubjects.forEach((el, index) => {
            el.setInitPos({ x: 10, y: 10, z: (index * -1) * 7 + 2 });
        })

        return sceneSubjects;
    }
    const scene = new buildScene();
    const renderer = new buildRender(screenDimensions);
    const camera = new buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    this.update = () => {
        controls.update();
        theta += 0.1;
        camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
        camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
        camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();
        const elapsedTime = clock.getElapsedTime();
        for (let i = 0; i < sceneSubjects.length; i++) {
            if (isEaven(i)) {
                sceneSubjects[i].update(elapsedTime, "sin");
            } else {
                sceneSubjects[i].update(-elapsedTime, "cos");
            }
        }


        renderer.render(scene, camera);
    }
    const isEaven = (n) => {
        return n % 2 === 0;
    }

    this.onWindowResize = () => {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }
    console.log(scene);
    this.disposeSceneEl = () => {
        scene.children.forEach(el => {
            if (el.type === "Mesh") {
                el.geometry.dispose();
                el.material.dispose();
                el.dispose();
            } else {
                scene.remove(el);
            }
            scene.remove.apply(scene, scene.children);

        })
    }
}