import {headerHerbi} from './data/herbivora.js'
import {headerInsek} from './data/insektivora.js'
import {headerKarni} from './data/karnivora.js'
import {headerOmni} from './data/omnivora.js'

function getHeaderContent(header) {
  let color = '';
  if (header === headerOmni) {
    color = 'brown';
  } else if (header === headerKarni) {
    color = 'light-blue darken-1';
  } else if (header === headerHerbi) {
    color = 'pink lighten-2'
  } else if (header === headerInsek) {
    color = 'green darken-2';
  }

  return `<div class="${color} padding-bottom">
            <div class="row white-text container">
              <div class="col s12 center-align">
                <h3 class="brand-logo">Hewan ${header.name}</h3>
                <img src="${header.img}" alt="" class="responsive-img header-img">
              </div>
              <div class="col s12 m6">
                <h4 class="center-align brand-logo">Pengertian</h4>
                <div class="white-line"></div>
                <p class="justify">${header.desc1}</p>
                <p class="justify">${header.desc2}</p>
              </div>
              <div class="col s12 m6">
                <h4 class="center-align brand-logo">Ciri-ciri</h4>
                <div class="white-line"></div>
                <ol>
                  <li class="justify-no-indent">${header.characteristic.one}</li>
                  <li class="justify-no-indent">${header.characteristic.two}</li>
                  <li class="justify-no-indent">${header.characteristic.three}</li>
                  <li class="justify-no-indent">${header.characteristic.four}</li>
                </ol>
              </div>
            </div>
          </div>`
}

function getMainContent(main, link) {
  return `
    <div class="col s12 m6">
      <div class="card">
        <div class="card-image">
          <img src="${main.img}">
        </div>
        <div class="card-content">
          <span class="card-title center-align">${main.name}</span>
          <p>${main.desc}</p>
        </div>
        <div class="card-action green">
          <a href="${link}" target="__blank" class="white-text">Lihat Detail</a>
        </div>
      </div>
    </div>
  `;
}

export {getHeaderContent, getMainContent};