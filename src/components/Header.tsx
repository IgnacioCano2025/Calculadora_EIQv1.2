import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t } = useTranslation()
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center gap-4 h-[var(--header-h)] px-4">
        <img src="/edra-logo.png" alt="EDRA" className="h-10 w-auto" />
        <div>
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <p className="text-xs text-slate-600">Paridad con Excel — versión MVP</p>
        </div>
      </div>
    </header>
  )
}
