let clickCount = 0;

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

    if (clickCount % 3 === 0) {
        const sound = document.getElementById("clickSound");

        sound.currentTime = 0;
        sound.play();
    }
});