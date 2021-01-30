import moment from 'moment';
import * as func from './functions.js';

const root = document.querySelector('#root');
const notifSubs = document.querySelector('.notif-subs');
let idMember = [];

document.addEventListener("DOMContentLoaded", function() {
  /* Memuat Team Info ketika Dokumen sudah ter-load */
  teamInfo();

  /* IndexedDb agar otomatis terbuat (jika tidak saat user langsung menuju saved page tanpa pernah nge-save terlebih dahulu IndexedDb-nya akan error)*/
  let db;
  let dbReq = indexedDB.open('mancity', 1);
  dbReq.onupgradeneeded = function(event) {
    // Set the db variable to our database so we can use it!
    db = event.target.result;

    db.createObjectStore('member', {keyPath: "id"});
  };
  dbReq.onsuccess = function(event) {
    db = event.target.result;

    console.log("IndexedDB success created");
  };
  dbReq.onerror = function(event) {
    alert('error opening database ' + event.target.errorCode);
  };
});

window.addEventListener('click', function() {
  if (event.target.classList.contains("team")) {
    teamInfo();
  }

  if (event.target.classList.contains("member")) {
    func.getSquadMemberTeam()
      .then(result => {
        let resultAll = '';

        result.forEach(elems => {          
          if (elems.position === null ) {
            elems.position = `<span class="red-text"><i>Empty (dari API-nya)</i></span>`;
          }
          if (elems.shirtNumber === null) {
            elems.shirtNumber = `<span class="red-text"><i>Empty (dari API-nya)</i></span>`;
          }

          resultAll += func.memberContent(elems);
        });

        let data = `
          <div id="member-container">
            <div class="row container">
              <div class="col s12 member-content">
                <h2 class="header center-align white-text big-title">Member Team</h2>
                ${resultAll}
              </div>
            </div>
          </div>
        `;
        root.innerHTML = data;
      })
      .catch(error => console.error("Error : ", error));
  }

  idMember.forEach(id => {
    if (event.target.classList.contains(id) && event.target.classList.contains("save-offline")) {
      fetch(`https://api.football-data.org/v2/players/${id}`, {
        headers : {
          "X-Auth-Token" : "ccf52ea7967743c5994057c9220bf23f"
        }
      })
      .then(response => {
        if (response.status === 200) {
          return response.clone().json();
        } else if (response.status === 404) {
          alert("Halaman tidak ditemukan : ", response.statusText);
        } else {
          console.error("Error", response.statusText);
        }
      })
      .then(result => {
        let id = result.id;
        let name = result.name;
        let position = result.position;
        let shirt = result.shirtNumber;
        let nationality = result.nationality;
        let country = result.countryOfBirth;
        let birth = moment(result.dateOfBirth).format("DD MMMM YYYY");
        let country_birth = country + ", " + birth;

        let db;
        let dbReq = indexedDB.open('mancity', 1);
        dbReq.onupgradeneeded = function(event) {
          // Set the db variable to our database so we can use it!
          db = event.target.result;

          db.createObjectStore('member', {keyPath: "id"});
        };
        dbReq.onsuccess = function(event) {
          db = event.target.result;

          func.addMember(db, id, name, position, shirt, nationality, country_birth);
        };
        dbReq.onerror = function(event) {
          alert('error opening database ' + event.target.errorCode);
        };
      })
      .catch(error => console.error(error));
    }
  });

  if (event.target.classList.contains("saved")) {
    let db;
    let dbReq = indexedDB.open('mancity', 1);

    dbReq.onsuccess = function(event) {
      db = event.target.result;
      
      func.getAndDisplayMember(db);
    };
    dbReq.onerror = function(event) {
      alert('error opening database ' + event.target.errorCode);
    };
  }

  idMember.forEach(id => {
    if (event.target.classList.contains(id) && event.target.classList.contains("btn-delete")) {
      let db;
      let dbReq = indexedDB.open('mancity', 1);

      dbReq.onsuccess = function(event) {
        db = event.target.result;
        
        let tx = db.transaction(['member'], 'readwrite');
        let member = tx.objectStore('member');
        let choice = confirm("Want to delete this?") ? member.delete(id) : false;
        if (choice) {
          tx.oncomplete = function() { 
            console.log("Data with key " + id + " deleted");
          };
        }
        tx.onerror = function(event) {
          alert('error deleting data ' + event.target.errorCode);
        };
      };
      dbReq.onerror = function(event) {
        alert('error opening database ' + event.target.errorCode);
      };
    }
  });
});

/* GET TEAM PAGE & ID SQUAD */
function teamInfo() {
  if ('caches' in window) {
    caches.match("https://api.football-data.org/v2/teams/65", {
      headers : {
        "X-Auth-Token" : "ccf52ea7967743c5994057c9220bf23f"
      }
    })
    .then(function(response) {
      if (response) {
        response.json().then(function (result) {
          let data = `
            <div id="team-container">
              <div class="row container">
                <div class="col s12">
                  <div class="card center-align team-content">
                    ${func.teamContent(result)}
                  </div>
                </div>
              </div>
            </div>
        
            ${func.galleryTeam()}
          `;
          root.innerHTML = data;
        });
      }
    });
  }

  fetch('https://api.football-data.org/v2/teams/65', {
    headers : {
      "X-Auth-Token" : "ccf52ea7967743c5994057c9220bf23f"
    }
  })
  .then(response => {
    if (response.status === 200) {
      return response.clone().json();
    } else if (response.status === 404) {
      alert("Halaman tidak ditemukan : ", response.statusText);
    } else {
      console.error("Error", response.statusText);
    }
  })
  .then(result => {
    let data = `
      <div id="team-container">
        <div class="row container">
          <div class="col s12">
            <div class="card center-align team-content">
              ${func.teamContent(result)}
            </div>
          </div>
        </div>
      </div>
  
      ${func.galleryTeam()}
    `;
    root.innerHTML = data;

    /* GET ID FROM API */
    let squad = result.squad;
    squad.forEach(e => {
      idMember.push(e.id);
    });
  })
  .catch(error => console.error(error));
}

/* TESTING NOTIFICATION */
notifSubs.addEventListener('click', function() {
  const title = 'Man City Page';
  const options = {
    'body' : 'Do you want to subscribe this page and get newest update content?',
    requireInteraction: true,
    'icon' : 'img/icon/icon-512x512.png',
    'badge' : 'img/icon/icon-512x512.png',
    'actions': [
      {
        'action': 'yes-action',
        'title': 'Yes',
      },
      {
        'action': 'no-action',
        'title': 'No',
      }
    ]
  };
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready
    .then(registration => registration.showNotification(title, options));
  } else {
    alert("You must allow notification feature");
  }
});