import * as THREE from 'three';
import SceneSubject from './SceneSubject/SceneSubject';
import GeneralLights from './SceneSubject/GeneralLights';
import * as OrbitControls from 'three-orbitcontrols';
import LineSubject from './SceneSubject/LineSubjects';

export default function SceneManager(canvas) {

    const clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    // const radius = 30;
    // let theta = 0;

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }
    const buildScene = () => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000");

        return scene;
    }
    this.hit = (intersesct) => {
        console.log(intersesct);
    }
    this.onMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerWidth) * 2 + 1;

        this.raycaster.setFromCamera(mouse, camera);
        let intersects = this.raycaster.intersectObjects(this.scene.children);
        console.log(intersects.length)
        for (let i = 0; i < intersects.length; i++) {
            console.log(intersects[i])
            if (intersects[i].object.type === 'Mesh') {
                console.log("oh")
            }
        }
    }

    const animateMeshes=()=>{
        const elapsedTime = clock.getElapsedTime();
        for (let i = 0; i < sceneSubjects.length; i++) {
            if (isEaven(i)) {
                sceneSubjects[i].update(elapsedTime, "sin");
            } else {
                sceneSubjects[i].update(-elapsedTime, "cos");
            }
        }

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
    this.scene = new buildScene();
    const renderer = new buildRender(screenDimensions);
    const camera = new buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(this.scene);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    this.update = () => {
        controls.update();
        // theta += 0.1;
        // camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
        // camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
        // camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
        // camera.lookAt(this.scene.position);
        animateMeshes();
        camera.updateProjectionMatrix();

        renderer.render(this.scene, camera);
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
    console.log(this.scene);
    this.disposeSceneEl = () => {
        this.scene.children.forEach(el => {
            if (el.type === "Mesh") {
                el.geometry.dispose();
                el.material.dispose();
                el.dispose();
            } else {
                this.scene.remove(el);
            }
            this.scene.remove.apply(this.scene, this.scene.children);

        })
    }
}