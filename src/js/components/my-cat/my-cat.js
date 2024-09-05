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
      top: 80px;
    }

    #cat-img-closed {

    }
  </style>
<div class="container">
  <img id="cat-img-closed" src="../img/krippa.png"/>
  <img id="cat-img-open" src="../img/yawn_head.png"/>
  <input-field class="input"></input-field>
</div>
`

customElements.define('my-cat',
  class extends HTMLElement {
    #inputField
    #catImgOpen
    #catImgClosed

    #isMouthOpen = false

    #talkingInterval

    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#inputField = this.shadowRoot.querySelector('.input')
      this.#catImgOpen = this.shadowRoot.querySelector('#cat-img-open')
      this.#catImgClosed = this.shadowRoot.querySelector('#cat-img-closed')

      this.#inputField.addEventListener('input-field', () => {
        this.#startTalking()
      })
    }

    #startTalking() {
      if (this.#talkingInterval) {
        clearInterval(this.#talkingInterval)
      }

      this.#talkingInterval = setInterval(() => {
        this.#toggleMouth()
      }, 200)

      setTimeout(() => {
        clearInterval(this.#talkingInterval)
        this.#catImgOpen.style.opacity = '0'
        this.#isMouthOpen = false
      }, 2000)
    }

    #toggleMouth() {
      if (this.#isMouthOpen) {
        this.#catImgOpen.style.opacity = '0'
      } else {
        this.#catImgOpen.style.opacity = '1'
      }
      this.#isMouthOpen = !this.#isMouthOpen
    }
  }
)
