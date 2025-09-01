import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  es: {
    translation: {
      title: 'Calculadora EIQ – EDRA',
      exportPdf: 'Exportar PDF',
      importExcel: 'Importar Excel',
      inputs: 'Carga de datos',
      results: 'Resultados',
      producerName: 'Nombre del Productor',
      fieldName: 'Nombre del lote',
      campaign: 'Campaña',
      areaHa: 'Superficie (ha)',
      addProduct: 'Agregar producto',
      product: 'Producto',
      dose: 'Dosis',
      unit: 'Unidad',
      ingredients: 'Ingredientes',
      actions: 'Acciones',
      category: 'Categoría',
      eiqTotal: 'EIQ total',
      eiqPerHa: 'EIQ/ha',
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false }
})

export default i18n
