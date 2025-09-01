import { useEiqStore } from '@/state/store'
import { categorize } from '@/domain/eiq/categorize'

export default function ResultsTable() {
  const { result } = useEiqStore()
  if (!result) return <div className="card text-slate-500">Sin resultados.</div>

  const category = categorize(result.totalEiqPerHa)

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Resultados</h3>
        <div className="text-sm">
          <span className="font-semibold">Categoría:</span>{' '}
          <span className="px-2 py-1 rounded-lg bg-slate-100 border">{category}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-xl border">
          <div className="text-slate-600 text-sm">Normal field Scenario Field EIQ/ha</div>
          <div className="text-2xl font-bold">{result.totalEiq}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border">
          <div className="text-slate-600 text-sm">Scenario Field EIQ/ha</div>
          <div className="text-2xl font-bold">{result.totalEiqPerHa}</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table" aria-label="Tabla de resultados">
          <thead className="text-left border-b">
            <tr><th className="py-2 pr-2">Producto</th><th className="py-2 pr-2">EIQ</th><th className="py-2 pr-2">Scenario Field EIQ/ha</th><th className="py-2 pr-2">Detalle</th></tr>
          </thead>
          <tbody>
            {result.byProduct.map(p => (
              <tr key={p.productId} className="border-b last:border-0">
                <td className="py-2 pr-2">{p.name}</td>
                <td className="py-2 pr-2">{p.eiq}</td>
                <td className="py-2 pr-2">{p.eiqPerHa}</td>
                <td className="py-2 pr-2">
                  {p.byIngredient.map(b => <div key={b.ingredientId} className="text-slate-600">{b.name}: {b.eiq}</div>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
