if (document.body.animate) {
  document.addEventListener("win", pop);
}

let interval;

function pop() {
  document.removeEventListener("win", pop);

  const doors = document.getElementById("doors");
  interval = setInterval(() => {
    for (let i = 0; i < 30; i++) {
      // We call the function createParticle 30 times
      // As we need the coordinates of the mouse, we pass them as arguments
      createParticle(
        doors.getBoundingClientRect().left +
          doors.getBoundingClientRect().width / 2,
        doors.getBoundingClientRect().top +
          doors.getBoundingClientRect().height / 2
      );
    }
  }, 1000);
}

function createParticle(x, y) {
  const particle = document.createElement("particle");
  document.body.appendChild(particle);
  let width = Math.floor(Math.random() * 30 + 8);
  let height = width;
  let destinationX = (Math.random() - 0.5) * 500;
  let destinationY = (Math.random() - 0.5) * 500;
  let rotation = Math.random() * 520;
  let delay = Math.random() * 200;

  if (Math.random() > 0.25) {
    particle.innerHTML = ["🍀", "🎉", "💵", "🎊", "✨"][
      Math.floor(Math.random() * 5)
    ];
    particle.style.fontSize = `${Math.random() * 24 + 10}px`;
    width = height = "auto";
  } else {
    particle.style.backgroundImage = "url(images/coin.png)";
  }

  particle.style.width = `${width}px`;
  particle.style.height = `${height}px`;
  const animation = particle.animate(
    [
      {
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
        opacity: 1,
      },
      {
        transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${
          y + destinationY
        }px) rotate(${rotation}deg)`,
        opacity: 0,
        delay: 5000,
      },
    ],
    {
      duration: Math.random() * 3000 + 5000,
      easing: "cubic-bezier(0, .9, .57, 1)",
      delay: delay,
    }
  );
  animation.onfinish = removeParticle;
}

function removeParticle(e) {
  e.srcElement.effect.target.remove();
}
