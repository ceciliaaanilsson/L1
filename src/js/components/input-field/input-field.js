/**
 * The input-field web component module.
 *
 * @author Cecilia Nilsson <cn223dw@student.lnu.se>
 * @version 1.1.2
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>

  </style>
<form id="form">
  <input id="input" type="text"/>
</form>
`

customElements.define('input-field',
  /**
   * Represents a input field component.
   */
  class extends HTMLElement {
    #inputField

    #form

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#inputField = this.shadowRoot.querySelector('#input')
      this.#form = this.shadowRoot.querySelector('#form')

      this.#form.addEventListener('submit', (event) => {
        event.preventDefault()

        const inputEvent = new CustomEvent('input-field', {
          detail: this.#inputField.value
        })
        this.dispatchEvent(inputEvent)
      })
    }
  }
)
