
function mulai() {
  document.getElementById("mulai").classList.add("hide");
  audioAwal();
  kata_kata();
}

async function kata_kata() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const textElement = document.getElementById("text");
  const texts = [
        "3",
        "2",
        "1",
        "Neng Sayanggg",
        "Sayangnya abang",
        "Cantiknya abang",
        "I Love Youuu",
        "Hari ini",
        "Sabtu, 1 Juni 2024",
        "Ijinkan abang..",
        "Bertanya satu hal..",
        "Siapp ??",
        "....",
        "Dari lubuk hati terdalam",
        "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم",
        "♥♥ Seny Indriani ♥♥ ",
        "<p class='pp'>Will you marry me ?</p> ",
  ];

  // Menampilkan teks satu per satu
  for (let i = 0; i < texts.length; i++) {
      textElement.innerHTML = `<h1>${texts[i]}</h1>`;
      await delay(6000); // Menampilkan setiap teks selama 6000ms
  }

  const btnn = document.getElementById("btnn");
  btnn.innerHTML = "Mau banget";
  btnn.style.display = "block";
}

function notLoad() {
  document.body.classList.remove("not-loaded");
  document.getElementById("night").classList.add("night");
  document.getElementById("text").innerHTML = `<p class='pp ppp'>Maksih Sayanggg</p>`;
  document.getElementById("btnn").innerHTML = `<a class='hrefa' href="gallery.html">Lanjut kesini yaa</a>`;

 
}

async function audioAwal() {
  const audio = new Audio("../media/melamarmu.mp3");
  await audio.play();
}