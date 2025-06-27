// Generate beautiful SVG fallback images when API fails
export function generateFallbackImage(
  prompt: string, 
  index: number,
  character: string = 'hero'
): string {
  const colors = [
    { bg: '#FFE5E5', fg: '#FF6B6B', accent: '#4ECDC4' }, // Coral & Teal
    { bg: '#E5F3FF', fg: '#4ECDC4', accent: '#FFE66D' }, // Blue & Yellow
    { bg: '#F0E5FF', fg: '#9B59B6', accent: '#3498DB' }, // Purple & Blue
    { bg: '#FFE5CC', fg: '#FF8C42', accent: '#6C5CE7' }, // Orange & Purple
    { bg: '#E5FFE5', fg: '#27AE60', accent: '#E74C3C' }, // Green & Red
  ];
  
  const color = colors[index % colors.length];
  
  const characterEmojis: Record<string, string> = {
    princess: '👸',
    knight: '⚔️',
    dragon: '🐲',
    wizard: '🧙‍♂️',
    cat: '🐱',
    mouse: '🐭',
    hero: '🦸'
  };
  
  const emoji = characterEmojis[character] || '⭐';
  
  const scenes = [
    { icon: '🏰', desc: 'Adventure Begins' },
    { icon: '🌟', desc: 'Magical Journey' },
    { icon: '🌈', desc: 'Happy Ending' }
  ];
  
  const scene = scenes[index % scenes.length];
  
  const svg = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color.fg};stop-opacity:0.3" />
        </linearGradient>
        <filter id="soft-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="512" height="512" fill="url(#bg-gradient)"/>
      
      <!-- Decorative circles -->
      <circle cx="50" cy="50" r="30" fill="${color.accent}" opacity="0.2"/>
      <circle cx="462" cy="462" r="40" fill="${color.fg}" opacity="0.2"/>
      <circle cx="450" cy="80" r="25" fill="${color.accent}" opacity="0.15"/>
      <circle cx="80" cy="450" r="35" fill="${color.fg}" opacity="0.15"/>
      
      <!-- Main content background -->
      <rect x="106" y="156" width="300" height="200" rx="20" fill="white" opacity="0.9" filter="url(#soft-shadow)"/>
      
      <!-- Character emoji -->
      <text x="256" y="220" font-family="Arial, sans-serif" font-size="64" text-anchor="middle" fill="${color.fg}">
        ${emoji}
      </text>
      
      <!-- Scene icon -->
      <text x="256" y="290" font-family="Arial, sans-serif" font-size="40" text-anchor="middle" fill="${color.accent}">
        ${scene.icon}
      </text>
      
      <!-- Description -->
      <text x="256" y="330" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="${color.fg}" font-weight="600">
        ${scene.desc}
      </text>
      
      <!-- Decorative stars -->
      <text x="150" y="130" font-family="Arial, sans-serif" font-size="24" fill="${color.accent}" opacity="0.6">✨</text>
      <text x="350" y="130" font-family="Arial, sans-serif" font-size="24" fill="${color.accent}" opacity="0.6">✨</text>
      <text x="150" y="390" font-family="Arial, sans-serif" font-size="24" fill="${color.accent}" opacity="0.6">⭐</text>
      <text x="350" y="390" font-family="Arial, sans-serif" font-size="24" fill="${color.accent}" opacity="0.6">⭐</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}