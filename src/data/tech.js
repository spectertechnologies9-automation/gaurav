/** TECH STACK — grouped. `cmd` is the fake shell command shown in the command centre. */
export const techGroups = [
  { id: 'frontend', label: 'Frontend', cmd: 'ui', color: 'cyan', items: ['React', 'Vite', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript', 'GSAP', 'Lenis'] },
  { id: 'backend', label: 'Backend', cmd: 'api', color: 'mint', items: ['Node.js', 'Python', 'FastAPI', 'REST APIs'] },
  { id: 'data', label: 'Databases', cmd: 'db', color: 'yellow', items: ['SQLite', 'PostgreSQL', 'ChromaDB'] },
  { id: 'ai', label: 'Artificial Intelligence', cmd: 'ai', color: 'lavender', items: ['Llama', 'Qwen', 'Gemini', 'Claude', 'Groq', 'Ollama', 'RAG architectures', 'Vector embeddings', 'Semantic search'] },
  { id: 'voice', label: 'Voice', cmd: 'voice', color: 'pink', items: ['Whisper', 'Faster-Whisper', 'Kokoro TTS', 'gTTS', 'Sarvam'] },
  { id: 'automation', label: 'Automation & Integration', cmd: 'hooks', color: 'orange', items: ['WPPConnect', 'Baileys', 'Meta Cloud API', 'Google Calendar API', 'WhatsApp integrations', 'NFC integrations'] },
  { id: 'deploy', label: 'Deployment', cmd: 'ship', color: 'blue', items: ['GitHub', 'GitHub Pages', 'Vercel', 'DNS configuration', 'Local GPU inference', 'Cloud hosting'] },
];

export const techCount = techGroups.reduce((n, g) => n + g.items.length, 0);
