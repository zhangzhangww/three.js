<template>
</template>

<script setup>
// 导入three
import * as THREE from 'three'  // 导入threejs
//导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入hdr加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 3

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

// 创建贴图
const textureLoader = new THREE.TextureLoader()
const map = textureLoader.load('./assets/1.png')
// 设置颜色空间
map.colorSpace = THREE.SRGBColorSpace
//ao贴图
const aomap = textureLoader.load('./assets/3.png')
//透明度贴图
const alphaMap = textureLoader.load('./assets/3.png')
// 全景贴图
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./assets/night.hdr', (texture) => {
    //设置球型映射
    texture.mapping = THREE.EquirectangularReflectionMapping 
    scene.background = texture // 设置背景
    scene.environment = texture  // 设置环境
    //反射贴图
    material.envMap = texture
})


// 创建平面
const PlaneGe = new THREE.PlaneGeometry(1, 1)
const material = new THREE.MeshBasicMaterial({ 
    color: 0xffffff ,
    side: THREE.DoubleSide, 
    map: map,
    // 允许透明
    // transparent: true,
    // ao贴图
    // aoMap: aomap,
    //透明度贴图
    alphaMap: map
})
const plane = new THREE.Mesh(PlaneGe, material)
scene.add(plane)

// 渲染循环
function animate() {
    requestAnimationFrame(animate)



    renderer.render(scene, camera)
}
animate()


</script>

<style lang="scss" scoped>
</style>
