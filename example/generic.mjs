
import { innerHTML, html } from '../dist/engraft.mjs';

export default class GenericElement extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }
  constructor(...args) {
    super(...args);
    this.num = 7;
    this.text = 'changed';
    this.clickHandler = this.clickHandler.bind(this);
    this.stars = ['Antares', 'Lesath', 'Graffias', 'Dschubba'];
  }
  attributeChangedCallback() {
    this.render();
  }
  connectedCallback() {
    this.render();
  }
  clickHandler(){
    alert(this.num++);
  }
  changeHandler(){
    console.log(this.text);
  }
  render() {
    let someObj = null, 
      size = 12, 
      style = {'color': 'red', 'line-height': this.num, 'font-size': `${size*3}px`};
    this[innerHTML] = html `
        <p id onblur="${ e => console.log(e.target.textContent) }" style="${ {"background-color": "lightblue"} }"
          onclick="${this.clickHandler}"
          contenteditable>&#955; ♏ (see browser console for see the changes)
        </p>
        <h1 onclick="${ function mustHaveAName() {alert('popup');} }" style="${style}">
          Hello, &lambda; ${this.getAttribute('name')}
        </h1>
        <ul>
          ${this.stars.map((name, i) => html `<li style="font-size: ${size*i}px" onclick="alert('${name}')">${name}</li>`)}
        </ul>
        ${ (this.stars.length > 5)
            ? html `<p>The constellation is complete</p>`
            : html `<p>There is some missing stars</p>`}
        <p onclick="${() => alert(this.num)}">
          ${ new function(lib){this.libName = lib;}('EngraftJS') }
          ${ {toString: () => 'method override'} }
        </p>
        <input onfocus="${() => this.changeHandler.call(this)}" />
        <span>${someObj}</span><i>${{}}</i><b>${undefined}</b><em>${[]}</em>
    `.trim();
  }
}

customElements.define('x-element', GenericElement);
