<script setup>
import * as THREE from 'three'  // 导入threejs
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'  // 导入轨道控制器
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js'  // 导入GUI

const scene = new THREE.Scene()  // 创建场景
const camera = new THREE.PerspectiveCamera(
  75, // 视角
  window.innerWidth / window.innerHeight,// 长宽比
  0.1, // 近截面
  1000// 远截面
)  // 创建相机

const renderer = new THREE.WebGLRenderer()  // 创建渲染器
renderer.setSize(window.innerWidth, window.innerHeight)  // 设置渲染器大小
document.body.appendChild(renderer.domElement)  // 将渲染器添加到页面中


const geometry = new THREE.BoxGeometry()  // 创建几何体
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })  // 创建材质
const parentMaterial = new THREE.MeshBasicMaterial({ color:0x00ff00, wireframe: true })  // 创建材质
const parentCube = new THREE.Mesh(geometry, parentMaterial)  // 创建父元素
const cube = new THREE.Mesh(geometry, material)  // 创建网格
scene.add(parentCube)  // 将网格添加到场景中
parentCube.add(cube)  // 将网格添加到父元素中

cube.position.set(2,0,0)  // 设置几何体位置

camera.position.z = 5  // 设置相机位置
camera.position.x = 2  // 设置相机位置
camera.position.y = 2  // 设置相机位置
camera.lookAt(cube.position)  // 设置相机看向网格



// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 开启阻尼
controls.dampingFactor = 0.02; // 设置阻尼系数
// controls.autoRotate = true; // 开启自动旋转


function render() {
  if (cube.position.x > 5) {
    cube.position.x = 0;
  }
  //如果后期需要控制器带有阻尼效果，或者自动旋转等效果，就需要加入controls.update()
  controls.update()
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

// 监听窗口动画
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;// 更新相机长宽比
  camera.updateProjectionMatrix();// 更新相机投影矩阵
  renderer.setSize(window.innerWidth, window.innerHeight);// 更新渲染器大小
  renderer.setPixelRatio(window.devicePixelRatio);// 设置像素比
});

let eventObject = {
  fullscreen:function(){
    document.body.requestFullscreen()
  },
  exitFullscreen:function(){
    document.exitFullscreen()
  },
}

// 创建gui
const gui = new GUI();
gui.add(eventObject,'fullscreen').name('全屏')
gui.add(eventObject,'exitFullscreen').name('退出全屏')

//创建文件夹
let folder = gui.addFolder('立方体位置');
//控制立方体位置
folder.add(cube.position, 'x', -5, 5, 1).name('立方体X位置');
folder.add(cube.position, 'y', -5, 5, 1).name('立方体Y位置').onFinishChange((val) => {
  console.log('立方体Y位置',val)
});
folder.add(cube.position, 'z', -5, 5, 1).name('立方体Z位置').onChange((val) => {
  console.log('立方体Z位置',val)
});
//控制立方体缩放
folder.add(cube.scale, 'x', 0, 5, 1).name('立方体X缩放');
//控制立方体材质
folder.add(parentMaterial,'wireframe' ).name('父元素立方体材质');
//控制立方体颜色
let colorParms = {
  color: 0x00ff00
}
folder.addColor(colorParms, 'color').name('立方体颜色').onChange((val) => {
  cube.material.color.set(val)
})


</script>

<template>
</template>

<style scoped>

</style>
