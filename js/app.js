import {getHeaderContent, getMainContent} from './functions.js'
import {herbivora, headerHerbi, linkHerbi} from './data/herbivora.js'
import {insektivora, headerInsek, linkInsek} from './data/insektivora.js'
import {karnivora, headerKarni, linkKarni} from './data/karnivora.js'
import {omnivora, headerOmni, linkOmni} from './data/omnivora.js'

const root = document.querySelector('#root');

let getAll = '';
herbivora.forEach(e => {
  getAll += getMainContent(e, linkHerbi);
});
root.innerHTML = `
  <div class="header-content">
    ${getHeaderContent(headerHerbi)}
  </div>
  <div class="main-content">
    <div class="row container">
      <div class="col s12 center-align">
        <h3 class="brand-logo">Daftar Hewan</h3>
        <div class="black-line"></div>
      </div>
      ${getAll}
    </div>
  </div>
`;

window.addEventListener('click', function() {
  if (event.target.classList.contains("herbivora")) {
    let getAll = '';
    herbivora.forEach(e => {
      getAll += getMainContent(e, linkHerbi);
    });
    root.innerHTML = `
      <div class="header-content">
        ${getHeaderContent(headerHerbi)}
      </div>
      <div class="main-content">
        <div class="row container">
          <div class="col s12 center-align">
            <h3 class="brand-logo">Daftar Hewan</h3>
            <div class="black-line"></div>
          </div>
          ${getAll}
        </div>
      </div>
    `;
  }
  if (event.target.classList.contains("karnivora")) {
    let getAll = '';
    karnivora.forEach(e => {
      getAll += getMainContent(e, linkKarni);
    });
    root.innerHTML = `
      <div class="header-content">
        ${getHeaderContent(headerKarni)}
      </div>
      <div class="main-content">
        <div class="row container">
          <div class="col s12 center-align">
            <h3 class="brand-logo">Daftar Hewan</h3>
            <div class="black-line"></div>
          </div>
          ${getAll}
        </div>
      </div>
    `;
  }
  if (event.target.classList.contains("omnivora")) {
    let getAll = '';
    omnivora.forEach(e => {
      getAll += getMainContent(e, linkOmni);
    });
    root.innerHTML = `
      <div class="header-content">
        ${getHeaderContent(headerOmni)}
      </div>
      <div class="main-content">
        <div class="row container">
          <div class="col s12 center-align">
            <h3 class="brand-logo">Daftar Hewan</h3>
            <div class="black-line"></div>
          </div>
          ${getAll}
        </div>
      </div>
    `;
  }
  if (event.target.classList.contains("insektivora")) {
    let getAll = '';
    insektivora.forEach(e => {
      getAll += getMainContent(e, linkInsek);
    });
    root.innerHTML = `
      <div class="header-content">
        ${getHeaderContent(headerInsek)}
      </div>
      <div class="main-content">
        <div class="row container">
          <div class="col s12 center-align">
            <h3 class="brand-logo">Daftar Hewan</h3>
            <div class="black-line"></div>
          </div>
          ${getAll}
        </div>
      </div>
    `;
  }
})