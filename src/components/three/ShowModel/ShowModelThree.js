// @flow
const THREE = require('three');

type config = {
  element: HTMLElement,
  isControllable: boolean,
  modelURL: string
};

export default function createModel({
  element,
  isControllable = true,
  modelURL = '3DModels/Ball.json'
}: config) {
  let scene, camera, renderer;
  let mouseX, mouseY;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  // let directionalLight1, directionalLight2;
  let controls;

  function init() {
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x242424);

    camera = new THREE.PerspectiveCamera(
      15,
      element.clientWidth / element.clientHeight,
      1,
      2000
    );
    camera.position.set(15, 15, 15);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(element.clientWidth, element.clientHeight);
    element.appendChild(renderer.domElement);

    // 控制器
    if (isControllable) {
      require('../js/controls/OrbitControls')(THREE);
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.addEventListener('change', render);
    }

    // 全局环境光
    const ambientLight1 = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight1);

    // 主平行光
    const directionalLight1 = new THREE.DirectionalLight(0xcccccc);
    directionalLight1.position.set(1, 2, 0);
    scene.add(directionalLight1);
    // 辅助光
    const directionalLight2 = new THREE.DirectionalLight(0x909090);
    directionalLight2.position.set(-1, -1, 1);
    scene.add(directionalLight2);

    // 导入 json 格式模型
    const loader = new THREE.JSONLoader();
    loader.load(
      // 资源 URL
      modelURL,
      // load 完成后的回调
      (geometry, materials) => {
        const material = new THREE.MeshFaceMaterial(materials);
        const object = new THREE.Mesh(geometry, material);
        scene.add(object);
      }
    );

    document.addEventListener('mousemove', onDocumentMouseMove);
  }

  function onDocumentMouseMove(event: MouseEvent) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function render() {
    // camera.position.x += (mouseX - camera.position.x) * 0.05;
    // camera.position.y += (-mouseY - camera.position.y) * 0.05;
    // camera.position.x += mouseX * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  function animate() {
    // const time = Date.now() / 300;
    // directionalLight1.position.x = Math.cos(time) * 50;
    // directionalLight1.position.y = Math.sin(time) * 50;
    requestAnimationFrame(animate);
    controls && controls.update();
    render();
  }

  return {
    init,
    render,
    animate
  };
}
