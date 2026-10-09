import { useState } from 'react'
import { QuoteSummary } from './QuoteSummary'

export function StepPayment({ catalog, state, dispatch, quote, quoteError }) {
  const [contactNotice, setContactNotice] = useState(false)

  return (
    <section aria-labelledby="step-payment" className="space-y-6">
      <div>
        <h2 id="step-payment" className="text-lg font-semibold text-gray-900">
          Forma de pago y descuento
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          La forma de pago es informativa y no modifica el precio.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {catalog.payment_methods.map((method) => {
            const selected = state.paymentMethodId === method.id
            return (
              <label
                key={method.id}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-sm ${
                  selected
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  className="mr-2"
                  checked={selected}
                  onChange={() => dispatch({ type: 'SELECT_PAYMENT_METHOD', id: method.id })}
                />
                {method.name}
              </label>
            )
          })}
        </div>
      </div>

      <div>
        <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
          Descuento
        </label>
        <select
          id="discount"
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          value={state.discountCode ?? ''}
          onChange={(event) =>
            dispatch({ type: 'SELECT_DISCOUNT', code: event.target.value || null })
          }
        >
          <option value="">Sin descuento</option>
          {catalog.discounts.map((discount) => (
            <option key={discount.id} value={discount.id}>
              {discount.name} — {discount.percent}%
            </option>
          ))}
        </select>
      </div>

      {quoteError && (
        <p role="alert" className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {quoteError}
        </p>
      )}

      <QuoteSummary catalog={catalog} state={state} quote={quote} />

      <div>
        <button
          type="button"
          onClick={() => setContactNotice(true)}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
        >
          Contactame
        </button>
        {contactNotice && (
          <p role="status" className="mt-2 text-sm text-gray-600">
            Próximamente: el formulario de contacto se habilita en el próximo paso.
          </p>
        )}
      </div>
    </section>
  )
}
