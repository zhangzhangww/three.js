<template>
    <div class="layout">
      <nav class="navbar">
        <router-link to="/" class="home-link">3D 场景集</router-link>
      </nav>
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .navbar {
    background-color: #34495e;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
  
  .home-link {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .main-content {
    flex: 1;
    padding: 1rem;
  }
  </style>