export function categorize(eiq: number): string {
  if (eiq <= 200) return 'LEADING'
  if (eiq <= 500) return 'ADVANCED'
  if (eiq <= 800) return 'ENGAGED'
  if (eiq < 2500) return 'ONBOARDING'
  // Supuesto: valores iguales o superiores a 2500
  return 'REVISAR'
}
