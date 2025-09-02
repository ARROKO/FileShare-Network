// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import os from 'os'

function getNetworkInterfaces() {
  const interfaces = os.networkInterfaces()
  const results = []

  for (const [interfaceName, addresses] of Object.entries(interfaces)) {
    if (!addresses) continue
    
    for (const address of addresses) {
      if (address.family === 'IPv4' && !address.internal) {
        let type = 'Réseau'
        let emoji = '🌐'
        
        if (interfaceName.toLowerCase().includes('wifi') || interfaceName.toLowerCase().includes('wireless')) {
          type = 'Wi-Fi'
          emoji = '📶'
        } else if (interfaceName.toLowerCase().includes('ethernet') || interfaceName.toLowerCase().includes('eth')) {
          type = 'Ethernet'
          emoji = '🔌'
        } else if (interfaceName.toLowerCase().includes('wsl')) {
          type = 'WSL'
          emoji = '🐧'
        }

        results.push({
          address: address.address,
          interface: interfaceName,
          type: type,
          emoji: emoji
        })
      }
    }
  }

  return results
}

const networkConsolePlugin = () => {
  return {
    name: 'network-console',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const address = server.httpServer?.address()
        if (address && typeof address === 'object') {
          const protocol = server.config.server.https ? 'https' : 'http'
          const port = address.port
          
          console.log('\n' + '='.repeat(60))
          console.log('🚀  APPLICATION DÉMARRÉE')
          console.log('='.repeat(60))
          console.log(`📍 Local:     ${protocol}://localhost:${port}`)
          
          const networkInterfaces = getNetworkInterfaces()
          
          if (networkInterfaces.length > 0) {
            console.log('\n📡  ACCÈS RÉSEAU:')
            networkInterfaces.forEach((iface) => {
              console.log(`   ${iface.emoji} ${iface.type.padEnd(8)}: ${protocol}://${iface.address}:${port}`)
              console.log(`     Interface: ${iface.interface}`)
            })
          }

          console.log('\n💡  POUR LES AUTRES MACHINES:')
          console.log('   → Utilisez une des adresses réseau ci-dessus')
          console.log('   → Assurez-vous d\'être sur le même réseau')
          console.log('='.repeat(60))
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), networkConsolePlugin()],
  server: {
    port: 4000,
    host: true,
    strictPort: true
  }
})