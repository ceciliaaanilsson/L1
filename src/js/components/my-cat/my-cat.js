/**
 * The my-cat web component module.
 *
 * @author Cecilia Nilsson <cn223dw@student.lnu.se>
 * @version 1.1.2
 */

import '../input-field/index.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .container {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-width: 50%;
      max-height: 500px;
      border: 1px solid black;
      border-radius: 10%;
      padding: 20%;
      margin: 10%;
    }

    img {
      height: 350px;
      margin-bottom: 10%;
    }

    #cat-img-open {
      position: absolute;
      opacity: 0;
      z-index: 1;
      height: 300px;
      top: 120px;
    }

    .container {
      max-width: 300px;
      max-height: 450px;
    }
  </style>
<div class="container">
  <p id="output"></p>
  <img id="cat-img-closed" src="../img/krippa.png"/>
  <img id="cat-img-open" src="../img/yawn_head.png"/>
  <p>Enter your name:</p>
  <input-field class="input"></input-field>
</div>
`

customElements.define('my-cat',
  /**
   * Represents a my cat component.
   */
  class extends HTMLElement {
    #inputField

    #catImgOpen

    #isMouthOpen = false

    #talkingInterval

    #output

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#inputField = this.shadowRoot.querySelector('.input')
      this.#catImgOpen = this.shadowRoot.querySelector('#cat-img-open')
      this.#output = this.shadowRoot.querySelector('#output')

      this.#inputField.addEventListener('input-field', (e) => {
        this.#startTalking(e.detail)
      })
    }

    /**
     * Starts the talking interval.
     *
     * @param {string} name - The users name.
     */
    #startTalking (name) {
      if (this.#talkingInterval) {
        clearInterval(this.#talkingInterval)
        this.#output.textContent = ''
      }

      this.#output.textContent = `Hi ${name}! So nice to meet you. I am the talking cat!`

      this.#talkingInterval = setInterval(() => {
        this.#toggleMouth()
      }, 200)

      setTimeout(() => {
        clearInterval(this.#talkingInterval)
        this.#catImgOpen.style.opacity = '0'
        this.#isMouthOpen = false
      }, 6000)
    }

    /**
     * Toggles the cats mouth.
     */
    #toggleMouth () {
      if (this.#isMouthOpen) {
        this.#catImgOpen.style.opacity = '0'
      } else {
        this.#catImgOpen.style.opacity = '1'
      }
      this.#isMouthOpen = !this.#isMouthOpen
    }
  }
)
