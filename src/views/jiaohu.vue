<template>
  <div></div>
</template>

<script setup>
// 导入three
import * as THREE from 'three'  // 导入threejs
//导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//导入tween
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'



// 创建场景
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x999999)

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10

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

//创建3个球
const geometry = new THREE.SphereGeometry(1, 32, 32)//球体
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
const sphere1 = new THREE.Mesh(geometry, material1)
const sphere2 = new THREE.Mesh(geometry, material2)
const sphere3 = new THREE.Mesh(geometry, material3)
sphere1.position.x = -4
sphere2.position.x = 4
sphere3.position.x = 0
// scene.add(sphere1, sphere2, sphere3)
scene.add(sphere3)

//补间动画
const tween = new TWEEN.Tween(sphere3.position)
tween.to({ x: 4, }, 1000).onUpdate(() => {
    
}).onComplete(() => {
    console.log('动画完成')
})
//重复一次
// tween.repeat(1)
//循环往复
tween.yoyo(true)
//延迟一秒
// tween.delay(1000)
//缓动函数
tween.easing(TWEEN.Easing.Cubic.InOut)


const tween2 = new TWEEN.Tween(sphere3.position)
tween2.to({ y: 4, }, 1000)
//循环往复
tween2.yoyo(true)
//动画链接
tween.chain(tween2)
tween2.chain(tween)

tween.start()



// // 创建射线
// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()//创建二维向量

// // 监听鼠标移动
// window.addEventListener('click', (event) => {
//     // 将鼠标位置归一化到-1到1之间
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
//     //通过鼠标和摄像机位置设置射线
//     raycaster.setFromCamera(mouse, camera)
//     // 计算物体和射线的交点
//     const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3])
//      console.log(intersects)
//     for (let i = 0; i < intersects.length; i++) {
        
//         intersects[i].object.material.color.set(0xffff00)

//     }

// })


// 渲染循环
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    //更新tween
    TWEEN.update()
}
animate()
</script>

<style lang="scss" scoped>
</style>
