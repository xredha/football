class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="blue lighten-3" role="navigator">
        <div class="container">
          <div class="nav-wrapper">
            <a class="brand-logo">Man City</a>
            <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down topnav"></ul>
            <ul class="sidenav" id="nav-mobile"></ul>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("custom-navbar", Navbar);