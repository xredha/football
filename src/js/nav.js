/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", function() {
  let page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);
  
  function loadPage(page) {
    fetch(`/views/${page}.html`)
      .then(response => {
        if (response.status === 200) {
          return;
        } else if (response.status === 404) {
          alert("Page not found!!!");
        } else {
          console.error("Something Wrong");
        }
      })
      .catch(error => console.error(`Error : ${error}`));
  }

  //Side Bar
  const sideNav = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sideNav);
  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status !== 200) return;
  
        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });
  
        // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
          elm.addEventListener("click", function(event) {
            // Tutup sidenav
            var sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();
  
            // Muat konten halaman yang dipanggil
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "views/nav.html", true);
    xhttp.send();
  }
});