'use client'

import { WagmiConfig, createConfig } from 'wagmi'
import { config } from './config/accountKit'

const wagmiConfig = createConfig(config)

export default function AATestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <WagmiConfig config={wagmiConfig}>
          {children}
        </WagmiConfig>
      </body>
    </html>
  )
}
