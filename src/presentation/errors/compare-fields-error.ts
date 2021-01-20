export class CompareFieldsError extends Error {
  constructor (field: string, fieldToCompare: string) {
    super(`Field ${field} is diferent to ${fieldToCompare}`)
    this.name = 'CompareFieldError'
  }
}
