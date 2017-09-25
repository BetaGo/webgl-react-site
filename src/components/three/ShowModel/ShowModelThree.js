// @flow
import * as originalThree from 'three';
import orbitControlEnhancer from '../js/controls/OrbitControls';

const THREE = orbitControlEnhancer(originalThree);

type config = {
  element: HTMLElement,
  isControllable: boolean,
  modelURL: string,
  globalLight: any,
  primaryLight: any,
  secondaryLight: any,
  cameraPosition: Array<number>
};

export default function createModel({
  element,
  isControllable = true,
  modelURL = '3DModels/Ball.json',
  globalLight = 0x606060,
  primaryLight = 0xcccccc,
  secondaryLight = 0x909090,
  cameraPosition = [15, 15, 15]
}: config) {
  let scene, camera, renderer;

  // let directionalLight1, directionalLight2;
  let controls;

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      15,
      element.clientWidth / element.clientHeight,
      1,
      2000
    );
    camera.position.set(...cameraPosition);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(element.clientWidth, element.clientHeight);
    element.appendChild(renderer.domElement);

    // 控制器
    if (isControllable) {
      // require('../js/controls/OrbitControls')(THREE);
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.addEventListener('change', render);
    }

    // 全局环境光
    const ambientLight1 = new THREE.AmbientLight(globalLight);
    scene.add(ambientLight1);

    // 主平行光
    const directionalLight1 = new THREE.DirectionalLight(primaryLight);
    directionalLight1.position.set(1, 2, 0);
    scene.add(directionalLight1);
    // 辅助光
    const directionalLight2 = new THREE.DirectionalLight(secondaryLight);
    directionalLight2.position.set(-1, -1, 1);
    scene.add(directionalLight2);

    // 导入 json 格式模型
    const loader = new THREE.JSONLoader();
    loader.load(
      // 资源 URL
      modelURL,
      // load 完成后的回调
      (geometry, materials) => {
        const material = materials[0];
        material.emissive.setHex(0x181818);
        const object = new THREE.Mesh(geometry, material);
        scene.add(object);
      }
    );
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
