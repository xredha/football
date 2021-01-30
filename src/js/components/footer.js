class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer class="page-footer blue lighten-3">
        <div class="container">
          <div class="row">
            <p>Supporter Services +44 (0) 161 444 1894 (Option 1, option 2, option 1)</p>
            <p>Manchester City FC Ltd 2020 | <a class="white-text" href="https://www.mancity.com/">Official Website</a></p>
            <button class="waves-effect waves-light btn yellow accent-2 notif-subs">Subscription</button>
          </div>
        </div>
        <div class="footer-copyright center-align">
          <div class="container">
            <p>Submission 2 - Dicoding © 2020 | Galih Redha Saputra | Thank's to BDD ❤️</p>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define("custom-footer", Footer);