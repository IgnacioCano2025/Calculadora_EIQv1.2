// src/App.tsx
import * as React from 'react'
import Header from './components/Header'
import Layout from './components/Layout'
import EiqForm from './components/Form'
import ResultsTable from './components/ResultsTable'
import PdfButton from './components/PdfButton'
import Diagnostics from './components/Diagnostics'
import { useEiqStore } from './state/store'
import productCatalog from '@/assets/product-catalog.json' // fallback generado

export default function App() {
  const { recalc, setInput, setCatalogs } = useEiqStore()

  
  // Fallback: cargamos un catálogo generado para que el selector ya funcione
  // (se sobreescribe cuando el usuario importa el XLSM real)
  React.useEffect(() => {
    setCatalogs({ products: productCatalog as any })
  }, [setCatalogs])

  return (
    <Layout>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-2"><Diagnostics /><PdfButton /></div>

        <EiqForm />
        <ResultsTable />
      </main>
    </Layout>
  )
}
