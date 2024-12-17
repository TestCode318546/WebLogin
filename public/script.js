function updateContent(language) {
  const elements = document.querySelectorAll("[data-en], [data-th]");

  elements.forEach((element) => {
    const enText = element.getAttribute("data-en");
    const thText = element.getAttribute("data-th");

    if (language === "en") {
      element.textContent = enText;
    } else if (language === "th") {
      element.textContent = thText;
    }
  });
}

function convertToHTMLCharCode(str) {
  return str
    .split("")
    .map((char) => "&#" + char.charCodeAt(0) + ";")
    .join("");
}

function waitForDOMContentLoaded() {
  return new Promise((resolve) => {
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      resolve();
    } else {
      document.addEventListener("DOMContentLoaded", resolve);
    }
  });
}

function CheckLanguage() {
  const btLanguageSwitch = ".language-switcher-switch input";
  const savedLanguage = localStorage.getItem("language") || "en";
  updateContent(savedLanguage);
  document.querySelector(btLanguageSwitch).checked = savedLanguage === "th";

  document.querySelector(btLanguageSwitch).addEventListener("change", () => {
    const language = document.querySelector(btLanguageSwitch).checked
      ? "th"
      : "en";
    updateContent(language);
    localStorage.setItem("language", language);
  });
}

function ActiveIconMenu() {
  document.querySelector(".menu-icon").addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.toggle("active");
    let icon = document.querySelector(".menu-icon");
    let headerLeft = document.querySelector(".header-left");
    if (convertToHTMLCharCode(icon.innerHTML) == "&#10006;") {
      icon.innerHTML = "&#9776;";
      let hr = document.querySelector("header hr");
      hr.remove();
    } else {
      icon.innerHTML = "&#10006;";
      const hr = document.createElement("hr");
      hr.style.margin = 0;
      hr.style.padding = 0;
      hr.style.border = "none";
      hr.style.height = "1px";
      hr.style.backgroundColor = "#79f7f7";
      headerLeft.insertAdjacentElement("afterend", hr);
    }
  });
}

function ActiveLanguageMobile() {
  let languageMobileText = document.querySelector(
    ".language-switcher-mobile-text"
  );
  function clickLanguage(languageMobileText) {
    languageMobileText.classList.toggle("active");
    let liLanguage = document.querySelectorAll(".language-switcher-mobile li");
    liLanguage.forEach((li) => li.classList.toggle("active"));
  }
  languageMobileText.addEventListener("click", function () {
    clickLanguage(languageMobileText);
  });

  document
    .querySelector(".language-switcher-mobile-en")
    .addEventListener("click", () => {
      updateContent("en");
      localStorage.setItem("language", "en");
      clickLanguage(languageMobileText);
    });

  document
    .querySelector(".language-switcher-mobile-th")
    .addEventListener("click", () => {
      updateContent("th");
      localStorage.setItem("language", "th");
      clickLanguage(languageMobileText);
    });
}

async function MatchSlide(playerWinText, playerLoseText) {
  return new Promise((resolve, reject) => {
    let divBoxMain = document.querySelector(".section2-lists");
    let divBox = document.createElement("div");
    divBox.className = "section2-lists-list";
    let playerWin = document.createElement("a");
    let playerLose = document.createElement("a");
    let textGame = document.createElement("a");
    let textLose = document.createElement("a");
    let textWin = document.createElement("a");

    textGame.className = "section2-lists-list-game";
    textGame.setAttribute("data-th", "เกม24");
    textGame.setAttribute("data-en", "Game24");
    textGame.style.fontWeight = "bold";
    textWin.setAttribute("data-th", "ผู้ชนะ: ");
    textWin.setAttribute("data-en", "Winner: ");
    playerWin.textContent = playerWinText;
    textLose.setAttribute("data-th", "ผู้แพ้: ");
    textLose.setAttribute("data-en", "Loser: ");
    playerLose.textContent = playerLoseText;

    if (localStorage.getItem("language") == "en") {
      textGame.textContent = "Game24";
      textWin.textContent = "Winner: ";
      textLose.textContent = "Loser: ";
    } else {
      textGame.textContent = "เกม24";
      textWin.textContent = "ผู้ชนะ: ";
      textLose.textContent = "ผู้แพ้: ";
    }

    divBox.appendChild(textGame);
    divBox.appendChild(document.createElement("br"));
    divBox.appendChild(textWin);
    divBox.appendChild(playerWin);
    divBox.appendChild(document.createElement("br"));
    divBox.appendChild(textLose);
    divBox.appendChild(playerLose);
    divBoxMain.appendChild(divBox);

    divBox.addEventListener("transitionend", (event) => {
      if (event.propertyName === "right") {
        divBox.remove();
      }
    });
    resolve(divBox);
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let matchLists = [];

async function CallMatchSlide() {
  const names = [
    "Alice555555555555555555555555555",
    "Bot",
    "Charlie",
    "David",
    "Emma",
    "Fiona",
    "George",
    "Mega Bot",
  ];

  const randomIndex = Math.floor(Math.random() * names.length);
  const name = names[randomIndex];
  let randomIndex2 = Math.floor(Math.random() * names.length);
  while (randomIndex == randomIndex2) {
    randomIndex2 = Math.floor(Math.random() * names.length);
  }
  const name2 = names[randomIndex2];
  matchLists.push({ playerWin: name, playerLose: name2 });

  if (matchLists.length > 0) {
    let divBox = await MatchSlide(
      matchLists[0]["playerWin"],
      matchLists[0]["playerLose"]
    );
    await delay(250);
    divBox.classList.toggle("active");
    matchLists.shift();
  }
}

function isMobile() {
  return window.innerWidth <= 768;
}

(async () => {
  await waitForDOMContentLoaded();
  CheckLanguage();
  ActiveIconMenu();
  ActiveLanguageMobile();
  if (isMobile()) {
    setInterval(CallMatchSlide, 10000);
  } else {
    setInterval(CallMatchSlide, 6000);
  }
})();
