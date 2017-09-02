// @flow
const THREE = require('three');

export default function createModel(element: HTMLElement) {
  let scene, camera, renderer;

  let primaryLight, secondaryLight;
  let controls;
  let clock;

  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x242424);

    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(
      15,
      element.clientWidth / element.clientHeight,
      1,
      2000
    );
    camera.position.set(0, 0, 1000);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(element.clientWidth, element.clientHeight);
    element.appendChild(renderer.domElement);

    // 控制器
    // require('../js/controls/OrbitControls')(THREE);
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.addEventListener('change', render);

    // 全局环境光
    // const ambientLight1 = new THREE.AmbientLight(0x606060);
    // scene.add(ambientLight1);

    // 主平行光
    primaryLight = new THREE.DirectionalLight(0xeeeeee, 2);
    primaryLight.position.set(-1, 0, 0);
    scene.add(primaryLight);

    // 辅助光
    // const secondaryLight = new THREE.DirectionalLight(0xcccccc);
    // secondaryLight.position.set(0, 50, -100);
    // scene.add(secondaryLight);

    // 导入 json 格式模型
    const loader = new THREE.JSONLoader();
    loader.load(
      // 资源 URL
      '3DModels/Moon.json',
      // load 完成后的回调
      (geometry, materials) => {
        const material = materials[0];
        material.emissive.setHex(0x242424);
        const object = new THREE.Mesh(geometry, material);
        scene.add(object);
      }
    );
  }

  function render() {
    // camera.position.x += (mouseX - camera.position.x) * 0.05;
    // camera.position.y += (-mouseY - camera.position.y) * 0.05;
    // camera.position.x += mouseX * 0.05;
    // camera.lookAt(scene.position);
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

  function setPrimaryLightPosition(x: number, y: number, z: number) {
    primaryLight.position.set(x, y, z);
  }

  function setCameraPosition(x: number, y: number, z: number) {
    camera.position.set(x, y, z);
  }

  return {
    init,
    clock,
    render,
    animate,
    setPrimaryLightPosition,
    setCameraPosition
  };
}
