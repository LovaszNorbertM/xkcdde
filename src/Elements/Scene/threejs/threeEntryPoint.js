import SceneManager from './SceneManager';
export default containerElement => {



  const createCanvas = (document, containerElement) => {
    const canvas = document.createElement("canvas");
    containerElement.appendChild(canvas);
    return canvas;
  }
  const bindEventListeners = () => {
    window.onresize = resizeCanvas;
    resizeCanvas();
  }
  const resizeCanvas = () => {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    sceneManager.onWindowResize();
  }
  const render = (time) => {
    requestAnimationFrame(render);
    
    sceneManager.update();
  }
  const canvas = createCanvas(document, containerElement);
  const sceneManager = new SceneManager(canvas);
  window.addEventListener('mousedown',sceneManager.onMouseMove, false)
  bindEventListeners();
  render();
  // setTimeout(sceneManager.disposeSceneEl,5000)
}