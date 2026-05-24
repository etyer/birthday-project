window.onload = () => {
    const btn = document.getElementById("gameBtn");

    setTimeout(() => {
        btn.classList.remove("hidden");
        btn.classList.add("show");
    }, 8000); // yazı bitince
};

let clickCount = 0;

const sounds = [
    document.getElementById("sound1"),
    document.getElementById("sound2"),
    document.getElementById("sound3"),
    document.getElementById("sound4"),
    document.getElementById("sound5")
];

document.addEventListener("click", function(e) {

    // HEART CREATE
    const heart = document.createElement("img");

    heart.src = "assets/images/heart.png";
    heart.classList.add("heart");

    heart.style.left = e.clientX - 30 + "px";
    heart.style.top = e.clientY - 30 + "px";

    document.body.appendChild(heart);

    // REMOVE AFTER ANIMATION
    setTimeout(() => {
        heart.remove();
    }, 1000);

    // SOUND SYSTEM
    clickCount++;

    // HER 5 TIKTA BİR
    if (clickCount % 5 === 0) {

        // RANDOM SOUND
        let randomIndex = Math.floor(Math.random() * sounds.length);

        let sound = sounds[randomIndex];

        sound.currentTime = 0;
        sound.play();
    }
});