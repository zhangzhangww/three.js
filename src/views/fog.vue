<template>
</template>

<script setup>
// 导入three
import * as THREE from 'three'  // 导入threejs
//导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入模型
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// 解压模型
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// 导入hdr加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

// 创建场景
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xF68A3E)

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(6, 6, 6)
camera.lookAt(camera.position)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//辅助坐标系
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 创建控制器
const controls = new OrbitControls(camera, renderer.domElement)

//自适应窗口
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})


// 全景贴图
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./assets/night.hdr', (texture) => {
    //设置球型映射
    texture.mapping = THREE.EquirectangularReflectionMapping 
  
    scene.environment = texture  // 设置环境
    //反射贴图
    // material.envMap = texture
})


// 解压模型
const dracoLoader = new DRACOLoader()
//设置解压库的路径
dracoLoader.setDecoderPath('./draco/')


//实例化加载器
const loader = new GLTFLoader()
// 设置解压库
loader.setDRACOLoader(dracoLoader)
// 加载模型
// loader.load('./models/mingzhu.glb', function (gltf) {
//     scene.add(gltf.scene)
    
//     console.log(gltf)
// }, undefined, function (error) {
//     console.error(error)
// })
loader.load('./models/car.glb', function (gltf) {
gltf.scene.position.set(0, 0, -2)

    scene.add(gltf.scene)

    
    console.log(gltf)
}, undefined, function (error) {
    console.error(error)
})

//添加光源
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 10, 0)
//光源强度
light.intensity = 4
//环境光
scene.add(light)


// 创建场景fog
scene.fog = new THREE.Fog(0x000000, 0.5, 50)
//创建场景指数雾
// scene.fog = new THREE.FogExp2(0x000000, 0.1)


// 渲染循环
function animate() {
    renderer.render(scene, camera)
    scene.rotateY += 0.01
    requestAnimationFrame(animate)
}
animate()


</script>

<style lang="scss" scoped>
</style>
