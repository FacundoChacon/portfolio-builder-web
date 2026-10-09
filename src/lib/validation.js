const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact({ name, email, phone }) {
  const errors = {}

  const trimmedName = (name ?? '').trim()
  if (trimmedName.length < 2 || trimmedName.length > 80) {
    errors.name = 'El nombre debe tener entre 2 y 80 caracteres.'
  }

  if (!EMAIL_PATTERN.test((email ?? '').trim())) {
    errors.email = 'Ingresá un email válido.'
  }

  const trimmedPhone = (phone ?? '').trim()
  if (trimmedPhone.length > 30) {
    errors.phone = 'El teléfono no puede superar los 30 caracteres.'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}