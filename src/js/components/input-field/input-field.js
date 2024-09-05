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

  <input id="input" type="text"/>
  <button id="submit-button">Submit</button>
`

customElements.define('input-field',
  /**
   * Represents a my cat component.
   */
  class extends HTMLElement {
    #inputField

    #submitButton
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.#inputField = this.shadowRoot.querySelector('#input')
        this.#submitButton = this.shadowRoot.querySelector('#submit-button')
  
        this.#submitButton.addEventListener('click', (event) => {
          event.preventDefault() // Förhindra sidladdning
  
          const inputEvent = new CustomEvent('input-field', { 
            detail: this.#inputField.value 
          })
          this.dispatchEvent(inputEvent)
        })
      }
    }
  )
