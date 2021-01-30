import moment from './../node_modules/moment/dist/moment.js';

/* TEAM PAGE */

function teamContent(result) {
  return `
    <h1 class="big-title">${result.name}</h1>
    <div class="card-image">
      <img class="img-team" src="${result.crestUrl}">
    </div>
    <p class="blue-text text-lighten-3 since">Since ${result.founded}</p>
    <div class="card-content">
      <h4 class="small-title">Introduction Team</h4>
      <ul class="collection">
        <li class="collection-item">
          <p class="valign-wrapper intro-team"> <i class="small material-icons icon-margin">account_box</i> <b>Short Name : &nbsp;</b> ${result.shortName} </p>
        </li>
        <li class="collection-item">
          <p class="valign-wrapper intro-team"> <i class="small material-icons icon-margin">location_on</i> <b>Address : &nbsp;</b> ${result.address} </p>
        </li>
        <li class="collection-item">
          <p class="valign-wrapper intro-team"> <i class="small material-icons icon-margin">local_phone</i> <b>Phone : &nbsp;</b> ${result.phone} </p>
        </li>
        <li class="collection-item">
          <p class="valign-wrapper intro-team"> <i class="small material-icons icon-margin">insert_link</i> <b>Website : &nbsp;</b> <a href="${result.website}" class="grey-text text-darken-4">${result.website}</a> </p>
        </li>
        <li class="collection-item">
          <p class="valign-wrapper intro-team"> <i class="small material-icons icon-margin">email</i> <b>Email : &nbsp;</b> ${result.email} </p>
        </li>
        <li class="collection-item">
          <p class="valign-wrapper intro-team"> <i class="small material-icons icon-margin">color_lens</i> <b>Club Color : &nbsp;</b> ${result.clubColors} </p>
        </li>
        <li class="collection-item">
          <p class="valign-wrapper intro-team"> <i class="small material-icons icon-margin">nature</i> <b>Venue : &nbsp;</b> ${result.venue} </p>
        </li>
      </ul>
    </div>
  `;
}

function galleryTeam() {
  return `
    <div class="row container">
      <div class="col s12">
        <div class="card">
          <div class="card-content center-align">
            <h4 class="small-title">Gallery</h4>
            <div class="row">
              <div class="col s12 m4">
                <img class="responsive-img gallery-img" src="img/gallery/1.webp" alt="Gallery">
                <img class="responsive-img gallery-img" src="img/gallery/2.webp" alt="Gallery">
              </div>
              <div class="col s12 m4">
                <img class="responsive-img gallery-img" src="img/gallery/3.webp" alt="Gallery">
                <img class="responsive-img gallery-img" src="img/gallery/4.webp" alt="Gallery">
              </div>
              <div class="col s12 m4">
                <img class="responsive-img gallery-img" src="img/gallery/5.webp" alt="Gallery">
                <img class="responsive-img gallery-img" src="img/gallery/6.webp" alt="Gallery">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* MEMBER PAGE */

function memberContent(result) {
  return `
    <div class="card">
      <div class="card-image">
        <img class="img-member" src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" alt="Logo Team">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <ul class="collection">
            <li class="collection-item"><b>Name : </b> ${result.name} </li>
            <li class="collection-item"><b>Position : </b> ${result.position} </li>
            <li class="collection-item"><b>Shirt Number : </b> ${result.shirtNumber} </li>
            <li class="collection-item"><b>Nationality : </b> ${result.nationality} </li>
            <li class="collection-item"><b>Country, Date of Birth : </b> ${result.countryOfBirth}, ${moment(result.dateOfBirth).format("DD MMMM YYYY")} </li>
          </ul>
        </div>
        <div class="right-align btn-offline">
          <button class="waves-effect waves-light btn save-offline ${result.id}">Save for Offline</button>
        </div>
      </div>
    </div>
  `;
}

function getSquadMemberTeam() {
  return fetch('https://api.football-data.org/v2/teams/65', {
    headers : {
      "X-Auth-Token" : "ccf52ea7967743c5994057c9220bf23f"
    }
    })
    .then(response => {
      if (response.status === 200) {
        return response.clone().json();
      } else if (response.status === 404) {
        alert("Halaman tidak ditemukan : ", response.statusText)
      } else {
        console.error("Error", response.statusText);
      }
    })
    .then(result => result.squad)
    .catch(error => console.error("Error : ", error))
}

/* SAVE PAGE */

function savedContent(resultDB) {
  return `
  <div class="card">
    <div class="card-image">
      <img class="img-member" src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" alt="Logo Team">
    </div>
    <div class="card-stacked">
      <div class="card-content">
        <ul class="collection">
          <li class="collection-item"><b>Name : </b> ${resultDB.name} </li>
          <li class="collection-item"><b>Position : </b> ${resultDB.position} </li>
          <li class="collection-item"><b>Shirt Number : </b> ${resultDB.shirt} </li>
          <li class="collection-item"><b>Nationality : </b> ${resultDB.nationality} </li>
          <li class="collection-item"><b>Country, Date of Birth : </b> ${resultDB.country_birth} </li>
        </ul>
      </div>
      <div class="right-align btn-offline">
        <button class="waves-effect waves-light btn btn-delete red ${resultDB.id}">Delete</button>
      </div>
    </div>
  </div>
  `;
}

/* INDEXED DB */

function addMember(db, id, name, position, shirt, nationality, country_birth) {
  let tx = db.transaction(['member'], 'readwrite');
  let store = tx.objectStore('member');
  let data = {
    id : id,
    name : name,
    position : position,
    shirt : shirt,
    nationality : nationality,
    country_birth : country_birth
  };
  store.add(data);
  tx.oncomplete = function() { 
    alert('Data saved');
    console.log('stored data : ' + name);
  }
  tx.onerror = function(event) {
    alert('error storing data ' + event.target.errorCode);
  }
}

function getAndDisplayMember(db) {
  let tx = db.transaction(['member'], 'readonly');
  let store = tx.objectStore('member');

  let req = store.openCursor();
  let allData = [];

  req.onsuccess = function(event) {
    let cursor = event.target.result;

    if (cursor !== null) {
      allData.push(cursor.value);
      cursor.continue();
    } else {
      displayMember(allData);
    }
  }
  req.onerror = function(event) {
    alert('error getting indexedDB ' + event.target.errorCode);
  }
}

function displayMember(resultDB) {
  let resultAll = '';

  resultDB.forEach(elems => {
    if (elems.position === null ) {
      elems.position = `<span class="red-text"><i>Empty (dari API-nya)</i></span>`;
    }
    if (elems.shirt === null) {
      elems.shirt = `<span class="red-text"><i>Empty (dari API-nya)</i></span>`;
    }

    resultAll += savedContent(elems);
  })
  
  let data = `
    <div id="member-container">
      <div class="row container">
        <div class="col s12 member-content">
          <h2 class="header center-align white-text big-title">Member Team (Saved Page)</h2>
          ${resultAll}
        </div>
      </div>
    </div>
  `;
  root.innerHTML = data;
}

export {teamContent, galleryTeam, memberContent, getSquadMemberTeam, savedContent, addMember, getAndDisplayMember, displayMember};