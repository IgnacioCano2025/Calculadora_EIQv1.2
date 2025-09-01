import * as React from 'react'

type Props = { children: React.ReactNode }
type State = { hasError: boolean; error?: any }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }
  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl mx-auto p-6 m-6 rounded-2xl border bg-red-50 border-red-200 text-red-800">
          <h2 className="text-lg font-semibold mb-2">Se produjo un error en la aplicación</h2>
          <pre className="whitespace-pre-wrap text-xs text-red-900">
{String(this.state.error)}
          </pre>
          <p className="mt-3 text-sm text-red-700">Revisá la consola del navegador para más detalles.</p>
        </div>
      )
    }
    return this.props.children
  }
}
