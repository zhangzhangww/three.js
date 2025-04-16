<template>
  <div class="fullscreen-container">
    <div id="vanta-bg"></div>
    <!-- 这里可以放置你的页面内容 -->
    <div class="content-overlay">
      <h1>千山鸟飞绝，万径人踪灭</h1>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let vantaEffect = null

onMounted(() => {
  // 确保VANTA库已加载
  if (window.VANTA) {
    initVanta()
  } else {
    // 添加备用监听，确保VANTA加载后初始化
    window.addEventListener('vanta:loaded', initVanta)
  }

  // 窗口大小改变时重新调整
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  // 清除Vanta效果和事件监听
  if (vantaEffect) {
    vantaEffect.destroy()
  }
  window.removeEventListener('vanta:loaded', initVanta)
  window.removeEventListener('resize', handleResize)
})

const initVanta = () => {
  vantaEffect = window.VANTA.BIRDS({
    el: '#vanta-bg',
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0xc3c3c3, // 主颜色改为蓝色
    color2: 0xc3c3c3, // 辅助颜色改为深蓝色
    colorMode: "lerp", // 颜色混合模式
    birdSize: 1.3, // 飞鸟大小
    wingSpan: 20.00, // 翅膀展开程度
    speedLimit: 6.00, // 速度限制
    separation: 30.00, // 分离度
    alignment: 30.00, // 对齐度
    cohesion: 25.00, // 凝聚力
    quantity: 5.00, // 飞鸟数量
    backgroundAlpha: 0 // 完全透明背景
  })
}

const handleResize = () => {
  // 窗口大小改变时重新初始化Vanta效果
  if (vantaEffect) {
    vantaEffect.resize()
  }
}
</script>

<style scoped>
.fullscreen-container {
  position: fixed; /* 使用fixed确保全屏 */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('../assets/backimage3.jpeg') no-repeat center center;
  background-size: cover;
}

#vanta-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* 背景层 */
  opacity: 0.8; /* 调整透明度 */
}

#vanta-bg > canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.content-overlay {
  position: relative;
  z-index: 1; /* 内容层 */
  color: white;
  padding: 2rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .content-overlay {
    padding: 1rem;
  }
  
  #vanta-bg {
    opacity: 0.7; /* 移动设备上降低透明度 */
  }
}
</style>