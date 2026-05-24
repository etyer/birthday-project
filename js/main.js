function openSettings() {
   document
   .getElementById("settingsPanel")
   .classList.remove("hidden");
}

function closeSettings() {
  document.getElementById("settingsPanel").classList.add("hidden");
}

function openSettings() {
   document.getElementById("settingsPanel")
   .classList.remove("hidden");
}

function closeSettings() {
  document.getElementById("settingsPanel")
  .classList.add("hidden");
}

document.getElementById("settingsBtn").addEventListener("click", openSettings);
document.getElementById("closeSettingsBtn").addEventListener("click", closeSettings);

function openSettings() {
    const panel = document.getElementById("settingsPanel");
    panel.classList.remove("hidden");

    const img = document.querySelector(".rules-image");

    // küçük gecikme = animasyonun çalışması için gerekli
    setTimeout(() => {
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
    }, 50);
}

function closeSettings() {
    const panel = document.getElementById("settingsPanel");
    const img = document.querySelector(".rules-image");

    panel.classList.add("hidden");

    // reset (tekrar açınca animasyon olsun)
    img.style.opacity = "0";
    img.style.transform = "scale(0.95)";
}