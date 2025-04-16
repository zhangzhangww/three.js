<template>
    <div class="navigation-container">
      <div class="hero-section">
        <h1 class="hero-title">3D 场景练习</h1>
        <p class="hero-subtitle">探索各种精美的 3D 场景示例</p>
        <div class="search-container">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索场景..." 
            class="search-input"
          >
          <svg class="search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>
  
      <div class="scene-grid">
        <router-link 
          v-for="route in filteredRoutes"
          :key="route.path"
          :to="route.path"
          class="scene-card"
        >
          <div class="card-image" :style="{ 'background-color': getRandomColor() }">
            <span class="scene-initial">{{ getInitial(route.name) }}</span>
          </div>
          <div class="card-content">
            <h3 class="scene-title">{{ route.name }}</h3>
            <p class="scene-description">{{ route.description }}</p>
          </div>
          <div class="card-hover">
            <span>查看场景</span>
            <svg viewBox="0 0 24 24" class="arrow-icon">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const searchQuery = ref('')
  
  // 生成一组漂亮的颜色
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F06292', '#7986CB', '#9575CD',
    '#64B5F6', '#4DB6AC', '#81C784', '#FFD54F'
  ]
  
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '3D'
  }
  
  const routeData = [
    // { path: '/line', name: '线条艺术', description: '展示精美的线条3D艺术效果' },
    { path: '/car', name: '汽车模型加载', description: '模型加载功能学习，汽车3D模型展示' },
    { path: '/box', name: '立方体', description: '立方体的3D练习，控制位置，大小方向等' },
    { path: '/bac', name: '背景场景', description: '丰富的3D背景环境' },
    // { path: '/fog', name: '雾效', description: '雾化效果的3D场景' },
    { path: '/bird', name: '飞鸟', description: '鸟类飞行的3D动画' },
    { path: '/jiaohu', name: '交互场景', description: '可交互的3D体验' },
  ]
  
  const filteredRoutes = computed(() => {
    if (!searchQuery.value) return routeData
    return routeData.filter(route => 
      route.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      route.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  </script>
  
  <style scoped>
  .navigation-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .hero-section {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2d3436;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #3498db, #9b59b6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
    color: #636e72;
    margin-bottom: 2rem;
  }
  
  .search-container {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .search-input {
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 2.5rem;
    border: 1px solid #dfe6e9;
    border-radius: 50px;
    font-size: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #74b9ff;
    box-shadow: 0 2px 15px rgba(116, 185, 255, 0.2);
  }
  
  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    fill: #636e72;
  }
  
  .scene-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .scene-card {
    position: relative;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    text-decoration: none;
    color: #2d3436;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .scene-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .card-image {
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #74b9ff, #a29bfe);
  }
  
  .scene-initial {
    font-size: 4rem;
    font-weight: bold;
    color: white;
    opacity: 0.8;
  }
  
  .card-content {
    padding: 1.5rem;
    flex: 1;
  }
  
  .scene-title {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .scene-description {
    margin: 0;
    color: #636e72;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .card-hover {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.9);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    border-top: 1px solid #f1f1f1;
  }
  
  .scene-card:hover .card-hover {
    transform: translateY(0);
  }
  
  .arrow-icon {
    width: 1.2rem;
    height: 1.2rem;
    fill: #3498db;
  }
  
  @media (max-width: 768px) {
    .scene-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
    
    .hero-title {
      font-size: 2rem;
    }
  }
  </style>