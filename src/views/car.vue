<script setup>
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

let canvasRef = ref(null)

// 创建场景
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x111122) // 深蓝色背景

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 4, 8)

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ 
  antialias: true,
  alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.5

// 添加控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 0.5
controls.minDistance = 5
controls.maxDistance = 15

// 添加动态粒子背景
const createParticleBackground = () => {
  const particlesGeometry = new THREE.BufferGeometry()
  const particleCount = 2000
  
  const posArray = new Float32Array(particleCount * 3)
  for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 50
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x88ccff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  })
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
  particlesMesh.position.z = -10
  scene.add(particlesMesh)
  
  return particlesMesh
}

// 添加环境光立方体
const createEnvironmentCube = () => {
  const geometry = new THREE.BoxGeometry(30, 30, 30)
  const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.BackSide
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  
  // 添加内部发光效果
  const edges = new THREE.EdgesGeometry(geometry)
  const lineMaterial = new THREE.LineBasicMaterial({ 
    color: 0x4488ff, 
    transparent: true,
    opacity: 0.3
  })
  const lines = new THREE.LineSegments(edges, lineMaterial)
  cube.add(lines)
  
  return cube
}

let wheel = []
let particles = null
let environmentCube = null

const render = () => {
  renderer.render(scene, camera)
  controls && controls.update()
  
  // 粒子动画
  if (particles) {
    particles.rotation.y += 0.0005
  }
  
  // 环境立方体动画
  if (environmentCube) {
    environmentCube.rotation.x += 0.0003
    environmentCube.rotation.y += 0.0005
  }
  
  requestAnimationFrame(render)
}

onMounted(() => {
  document.querySelector('.canvas-content').appendChild(renderer.domElement)
  
  // 创建动态背景元素
  particles = createParticleBackground()
  environmentCube = createEnvironmentCube()
  
  // 添加网格地面
  const gridHelper = new THREE.GridHelper(10, 10, 0x4488ff, 0x224477)
  gridHelper.material.opacity = 0.2
  gridHelper.material.transparent = true
  scene.add(gridHelper)

  // 窗口自适应
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
  })

  // 解压模型
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./draco/')

  // 添加模型
  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)
  loader.load('./models/car.glb', function (gltf) {
    gltf.scene.position.set(0, 0, -2)
    gltf.scene.traverse(function (child) {
      if (child.isMesh && child.name.includes('轮毂')) {
        wheel.push(child)
      }
      // 为所有模型添加投射阴影
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    scene.add(gltf.scene)
  }, undefined, function (error) {
    console.error(error)
  })

  // 轮毂旋转动画
  const animate = () => {
    wheel.forEach((item) => {
      item.rotation.x += 0.05
    })
    requestAnimationFrame(animate)
  }
  animate()

  // 优化光源设置
  const ambientLight = new THREE.AmbientLight(0x404040, 1)
  scene.add(ambientLight)

  // 主光源
  const mainLight = new THREE.DirectionalLight(0xffffff, 4)
  mainLight.position.set(5, 20, 10)
  mainLight.castShadow = true
  mainLight.shadow.mapSize.width = 2048
  mainLight.shadow.mapSize.height = 2048
  scene.add(mainLight)

  // 辅助光源
  //添加光源
  const light3 = new THREE.DirectionalLight(0xffffff)
    light3.position.set(20, 0,0)
    //环境光
    scene.add(light3)
    //添加光源
    const light4 = new THREE.DirectionalLight(0xffffff)
    light4.position.set(-20, 0,0)
    //环境光
    scene.add(light4)
  const fillLight = new THREE.DirectionalLight(0x88ccff, 1)
  fillLight.position.set(-5, 10, -10)
  scene.add(fillLight)

  // 背光
  const backLight = new THREE.DirectionalLight(0xff8844, 1)
  backLight.position.set(0, 5, -15)
  scene.add(backLight)

  // 开始渲染循环
  render()
})
</script>

<template>
  <div class="home">
    <div class="canvas-content" ref="canvasRef"></div>
    <div class="info-panel">
      <h1>3D汽车展示</h1>
      <p>使用鼠标拖动可以旋转查看模型</p>
      <p>滚轮可以缩放视图</p>
    </div>
  </div>
</template>

<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.canvas-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.info-panel {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 15px;
  border-radius: 8px;
  max-width: 300px;
  backdrop-filter: blur(5px);
}

.info-panel h1 {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
}

.info-panel p {
  margin: 5px 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

* {
  margin: 0;
  padding: 0;
}
</style>