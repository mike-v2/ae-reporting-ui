<template>
  <div class="home-container">
    <header class="hero">
      <h1>Clinical Trial Safety Portal</h1>
      <p>Accurately document and track adverse events with ease.</p>
    </header>
    
    <main class="actions">
      <router-link to="/report-ae" class="btn btn-primary">
        <span class="icon">➕</span> Report New Adverse Event
      </router-link>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
}

.hero {
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.25rem;
  color: #64748b;
}

.actions {
  display: flex;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.2);
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.3);
}

.icon {
  margin-right: 0.75rem;
}
</style>
