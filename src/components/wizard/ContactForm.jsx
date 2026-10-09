import { useState } from 'react'
import { createLead } from '../../api/client'
import { formatPrice } from '../../lib/format'
import { validateContact } from '../../lib/validation'

const EMPTY_FORM = { name: '', email: '', phone: '' }

export function ContactForm({ wizardState }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [lead, setLead] = useState(null)

  const pendingPaymentError = !wizardState.paymentMethodId

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const { valid, errors: fieldErrors } = validateContact(form)
    const nextErrors = { ...fieldErrors }
    if (pendingPaymentError) {
      nextErrors.payment = 'Elegí una forma de pago antes de enviar.'
    }
    setErrors(nextErrors)
    if (!valid || pendingPaymentError) return

    setSubmitting(true)
    setServerError(null)
    try {
      const created = await createLead({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        project_type_id: wizardState.projectTypeId,
        entity_id: wizardState.entityId,
        service_ids: wizardState.serviceIds,
        payment_method_id: wizardState.paymentMethodId,
        discount_code: wizardState.discountCode,
      })
      setLead(created)
    } catch {
      setServerError('No pudimos enviar tu pedido. Revisá tus datos e intentá de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  if (lead) {
    return (
      <div
        role="status"
        className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
      >
        ¡Listo! Recibimos tu pedido #{lead.id} — presupuesto {formatPrice(lead.total)}. Te
        contactamos a {lead.email}.
      </div>
    )
  }

  const inputClass = (hasError) =>
    `mt-1 w-full rounded-lg border px-3 py-2 text-sm ${
      hasError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
    }`

  return (
    <form noValidate onSubmit={handleSubmit} className="rounded-xl border border-gray-200 p-4">
      <h3 className="text-base font-semibold text-gray-900">Contactame</h3>

      <div className="mt-3">
        <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          id="lead-name"
          className={inputClass(errors.name)}
          value={form.name}
          onChange={(event) => update('name', event.target.value)}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600" data-testid="name-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="mt-3">
        <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="lead-email"
          type="email"
          className={inputClass(errors.email)}
          value={form.email}
          onChange={(event) => update('email', event.target.value)}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600" data-testid="email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="mt-3">
        <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700">
          Teléfono <span className="font-normal text-gray-500">(opcional)</span>
        </label>
        <input
          id="lead-phone"
          className={inputClass(errors.phone)}
          value={form.phone}
          onChange={(event) => update('phone', event.target.value)}
          aria-invalid={Boolean(errors.phone)}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-600" data-testid="phone-error">
            {errors.phone}
          </p>
        )}
      </div>

      {errors.payment && (
        <p className="mt-3 text-sm text-red-600" data-testid="form-error">
          {errors.payment}
        </p>
      )}

      {serverError && (
        <p role="alert" className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Enviando…' : 'Enviar'}
      </button>
    </form>
  )
}