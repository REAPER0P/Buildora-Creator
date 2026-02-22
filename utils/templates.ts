import { File } from '../types';

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  type: 'html' | 'php';
  files: (projectName: string) => Omit<File, 'id' | 'parentId'>[];
}

export const templates: Record<string, ProjectTemplate> = {
  'modern-landing': {
    id: 'modern-landing',
    name: 'Modern Landing Page',
    description: 'A beautiful, responsive landing page with glassmorphism and animations.',
    type: 'html',
    files: (name) => [
      {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="background-blobs">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
    </div>

    <main class="glass-container">
        <header>
            <div class="badge">New Project</div>
            <h1>${name}</h1>
            <p>Welcome to your new creative space. Start building something amazing today.</p>
        </header>

        <div class="features">
            <div class="card">
                <div class="icon">🚀</div>
                <h3>Fast</h3>
                <p>Lightning fast performance.</p>
            </div>
            <div class="card">
                <div class="icon">🎨</div>
                <h3>Beautiful</h3>
                <p>Modern design out of the box.</p>
            </div>
            <div class="card">
                <div class="icon">📱</div>
                <h3>Responsive</h3>
                <p>Looks great on all devices.</p>
            </div>
        </div>

        <button id="actionBtn" class="primary-btn">
            <span>Get Started</span>
            <div class="arrow">→</div>
        </button>
    </main>

    <script src="script.js"></script>
</body>
</html>`
      },
      {
        name: 'style.css',
        language: 'css',
        content: `:root {
    --primary: #6366f1;
    --secondary: #a855f7;
    --accent: #ec4899;
    --text: #1e293b;
    --bg: #0f172a;
    --glass: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(255, 255, 255, 0.5);
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    /* Safe centering for scrolling */
    align-items: center; 
    overflow-x: hidden;
    position: relative;
    padding: 2rem 0;
}

/* Animated Background */
.background-blobs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
    animation: float 10s infinite ease-in-out;
}

.blob-1 {
    width: 400px;
    height: 400px;
    background: var(--primary);
    top: -100px;
    left: -100px;
    animation-delay: 0s;
}

.blob-2 {
    width: 300px;
    height: 300px;
    background: var(--secondary);
    bottom: -50px;
    right: -50px;
    animation-delay: 2s;
}

.blob-3 {
    width: 250px;
    height: 250px;
    background: var(--accent);
    top: 40%;
    left: 40%;
    animation-delay: 4s;
}

@keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
}

/* Glass Container */
.glass-container {
    background: var(--glass);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 3rem;
    width: 90%;
    max-width: 600px;
    text-align: center;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    margin: auto; /* Center vertically and horizontally safely */
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
}

header h1 {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
    letter-spacing: -0.05em;
}

header p {
    font-size: 1.1rem;
    color: #475569;
    margin-bottom: 2.5rem;
    line-height: 1.6;
}

.badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary);
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
}

/* Features Grid */
.features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2.5rem;
}

.card {
    background: rgba(255, 255, 255, 0.5);
    padding: 1rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.8);
}

.icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.card h3 {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.card p {
    font-size: 0.75rem;
    color: #64748b;
}

/* Button */
.primary-btn {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
}

.primary-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.4);
}

.arrow {
    transition: transform 0.3s ease;
}

.primary-btn:hover .arrow {
    transform: translateX(4px);
}

@media (max-width: 600px) {
    .features {
        grid-template-columns: 1fr;
    }
    header h1 {
        font-size: 2.5rem;
    }
}`
      },
      {
        name: 'script.js',
        language: 'javascript',
        content: `const btn = document.getElementById('actionBtn');
const container = document.querySelector('.glass-container');

btn.addEventListener('click', () => {
    // Simple confetti effect or interaction
    btn.innerHTML = '<span>Awesome!</span> <div class="arrow">✨</div>';
    btn.style.background = 'linear-gradient(135deg, #10b981, #3b82f6)';
    
    // Tilt effect
    container.style.transform = 'scale(1.02) rotate(1deg)';
    setTimeout(() => {
        container.style.transform = 'scale(1) rotate(0deg)';
    }, 200);

    console.log('Buildora Project Started!');
});`
      }
    ]
  },
  'php-basic': {
    id: 'php-basic',
    name: 'PHP Basic',
    description: 'A simple PHP starter template.',
    type: 'php',
    files: (name) => [
      {
        name: 'index.php',
        language: 'php',
        content: `<?php
  // Basic PHP Local Server Simulation
  $title = "${name}";
  echo "<h1>Welcome to " . $title . "</h1>";
  echo "<p>PHP Server is simulated in this environment.</p>";
?>`
      }
    ]
  }
};
