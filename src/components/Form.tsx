import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEiqStore } from '@/state/store'
import type { EiqInput } from '@/domain/eiq/types'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ProductPicker from '@/components/ProductPicker'

const schema = z.object({
  producerName: z.string().min(1, 'Obligatorio'),
  fieldName: z.string().min(1, 'Obligatorio'),
  campaign: z.enum(['Campaña 25/26','Campaña 26/27','Campaña 27/28']),
  areaHa: z.number().positive('Debe ser > 0'),
  products: z.array(z.object({
    id: z.string(),
    name: z.string().min(1),
    dose: z.number().min(0),
    unit: z.string(),
    timesUsed: z.number().min(1).default(1),
    scenarioFieldPercent: z.number().min(0).max(100).default(100),
  })).max(200)
})

type FormData = z.infer<typeof schema>

export default function EiqForm() {
  const { t } = useTranslation()
  const { input, catalogs, setInput, recalc } = useEiqStore()

  const { register, control, handleSubmit, watch, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: input
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'products' })

  useEffect(() => {
    const subscription = watch((values) => {
      setInput(values as Partial<EiqInput>)
      recalc()
    })
    return () => subscription.unsubscribe()
  }, [watch, setInput, recalc])

  const addProduct = () => {
    append({ id: crypto.randomUUID(), name: '', dose: 0, unit: catalogs.units[0] ?? 'L/ha', timesUsed: 1, scenarioFieldPercent: 100 })
  }

  return (
    <form className="card space-y-6" onSubmit={handleSubmit(() => recalc())} aria-label={t('inputs')}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="producerName">{t('producerName')}</label>
          <input id="producerName" className="input" {...register('producerName')} />
          {errors.producerName && <p className="text-red-600 text-sm">{errors.producerName.message}</p>}
        </div>
        <div>
          <label className="label" htmlFor="fieldName">{t('fieldName')}</label>
          <input id="fieldName" className="input" {...register('fieldName')} />
        </div>
        <div>
          <label className="label" htmlFor="campaign">{t('campaign')}</label>
          <select id="campaign" className="input" {...register('campaign')}>
            <option>Campaña 25/26</option>
            <option>Campaña 26/27</option>
            <option>Campaña 27/28</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="areaHa">{t('areaHa')}</label>
          <input id="areaHa" type="number" step="0.01" className="input" {...register('areaHa', { valueAsNumber: true })} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{t('product')}</h3>
        <div className="flex items-center gap-2">
          <ProductPicker onSelect={(id) => {
            const item = useEiqStore.getState().catalogs.products?.[id]
            if (!item) return
            append({ id: crypto.randomUUID(), name: item.name, dose: (item.conventionalRate ?? item.maxRateKgHa ?? 1) || 1, unit: (item.userUom ?? 'L/ha')!, timesUsed: 1, scenarioFieldPercent: 100 })
          }} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table" aria-label="Tabla de productos">
          <thead className="text-left border-b">
            <tr>
              <th className="py-2 pr-2">#</th>
              <th className="py-2 pr-2">{t('product')}</th>
              <th className="py-2 pr-2">{t('dose')}</th>
              <th className="py-2 pr-2">{t('unit')}</th>
              <th className="py-2 pr-2"># usos</th>
              <th className="py-2 pr-2">% campo</th>
              <th className="py-2 pr-2">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f, idx) => (
              <tr key={f.id} className="border-b last:border-0">
                <td className="py-2 pr-2">{idx + 1}</td>
                <td className="py-2 pr-2">
                  <div className="flex gap-2">
                    <select className="input" onChange={(e) => {
                      const id = e.target.value
                      if (!id) return
                      const item = useEiqStore.getState().catalogs.products?.[id]
                      if (!item) return
                      setValue(`products.${idx}.name`, item.name)
                      setValue(`products.${idx}.dose`, (item.conventionalRate ?? item.maxRateKgHa ?? 1) || 1)
                      setValue(`products.${idx}.unit`, (item.userUom ?? 'L/ha')!)
                      setValue(`products.${idx}.timesUsed`, 1)
                      setValue(`products.${idx}.scenarioFieldPercent`, 100)
                    }} aria-label="Producto (catálogo)">
                      <option value="">Catálogo…</option>
                      {Object.values(catalogs.products ?? {}).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <input className="input" {...register(`products.${idx}.name` as const)} />
                  </div>
                </td>
                <td className="py-2 pr-2"><input type="number" step="0.01" className="input" {...register(`products.${idx}.dose` as const, { valueAsNumber: true })} /></td>
                <td className="py-2 pr-2">
                  <select className="input" {...register(`products.${idx}.unit` as const)}>
                    {catalogs.units.map(u => <option key={u}>{u}</option>)}
                  </select>
                </td>
                <td className="py-2 pr-2"><input type="number" min={1} className="input" {...register(`products.${idx}.timesUsed` as const, { valueAsNumber: true })} /></td>
                <td className="py-2 pr-2"><input type="number" min={0} max={100} className="input" {...register(`products.${idx}.scenarioFieldPercent` as const, { valueAsNumber: true })} /></td>
                <td className="py-2 pr-2">
                  <button type="button" className="btn-outline" onClick={() => remove(idx)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

          </form>
  )
}
