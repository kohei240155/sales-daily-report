'use client'

import type { ComponentType } from 'react'

import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'

import type { SwaggerUIProps } from 'swagger-ui-react'

const SwaggerUI = dynamic<SwaggerUIProps>(
  () =>
    import('swagger-ui-react') as Promise<{
      default: ComponentType<SwaggerUIProps>
    }>,
  { ssr: false }
)

export default function ApiDocsPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-white">
      <SwaggerUI url="/openapi.yaml" />
    </div>
  )
}
