import { data } from "../data/selectedwilders.js";

//////////////// Import Card Template ////////////////

import { cardTemplate } from "./card.js";

//////////////// Create a loop to generate the cards ////////////////
let htmlIntegration = "";

for (let i = 0; i < data.length; i++) {
  htmlIntegration += cardTemplate(data[i], i);
}
const cardGenerate = document.getElementsByClassName("wilders-carrousel");
cardGenerate[0].innerHTML = htmlIntegration;




//////////////// Create a Carousel ////////////////

window.onload = function () {
  const carousel = new CardCarousel(cardsContainer);
};



const cardsContainer = document.querySelector(".wilders-carrousel");
const cardsController = document.querySelector(".wilders-carrousel");

class DraggingEvent {
  constructor(target = undefined) {
      this.target = target;
  }
  event(callback) {
      let handler;

      this.target.addEventListener("touchstart", (e) => {
          handler = callback(e);
          window.addEventListener("touchmove", handler, { passive: true });
          window.addEventListener("touchend", clearDraggingEvent, { passive: true });
          window.addEventListener("mouseleave", clearDraggingEvent, { passive: true });

          function clearDraggingEvent() {
              window.removeEventListener("touchmove", handler);
              window.removeEventListener("touchend", clearDraggingEvent);
              handler(null);
          }
      }, { passive: true });
  }

  // Get the distance between the start and the end of the slide

  getDistance(callback) {
    function distanceInit(e1) {
      let startingX, startingY;

      if ("touches" in e1) {
        startingX = e1.touches[0].clientX;
        startingY = e1.touches[0].clientY;
      } else {
        startingX = e1.clientX;
        startingY = e1.clientY;
      }

      return function (e2) {
        if (e2 === null) {
          return callback(null);
        } else {
          if ("touches" in e2) {
            return callback({
              x: e2.touches[0].clientX - startingX,
              y: e2.touches[0].clientY - startingY,
            });
          } else {
            return callback({
              x: e2.clientX - startingX,
              y: e2.clientY - startingY,
            });
          }
        }
      };
    }

    this.event(distanceInit);
  }
}

class CardCarousel extends DraggingEvent {
  constructor(container, controller = undefined) {
    super(container);

    // DOM elements
    this.container = container;
    this.controllerElement = controller;
    this.cards = container.querySelectorAll(".card");

    // Carousel data
    this.centerIndex = (this.cards.length - 1) / 2;
    this.cardWidth =
      (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
    this.xScale = {};

    // Resizing
    window.addEventListener("resize", this.updateCardWidth.bind(this));

    if (this.controllerElement) {
      this.controllerElement.addEventListener(
        "keydown",
        this.controller.bind(this)
      );
    }

    // Initializers
    this.build();

    document
      .querySelector(".slide-left-button")
      .addEventListener("click", this.slideLeft.bind(this));
    document
      .querySelector(".slide-right-button")
      .addEventListener("click", this.slideRight.bind(this));
    // Bind dragging event
    super.getDistance(this.moveCards.bind(this));
  }


  updateCardWidth() {
    this.cardWidth =
      (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;

    this.build();
  }

  build(fix = 0) {
    for (let i = 0; i < this.cards.length; i++) {
      const x = i - this.centerIndex;
      const scale = this.calcScale(x);
      const scale2 = this.calcScale2(x);
      const zIndex = -Math.abs(i - this.centerIndex);

      const leftPos = this.calcPos(x, scale2);

      this.xScale[x] = this.cards[i];

      this.updateCards(this.cards[i], {
        x: x,
        scale: scale,
        leftPos: leftPos,
        zIndex: zIndex,
      });
    }
  }

  controller(e) {
    const temp = { ...this.xScale };

    if (e.keyCode === 39) {
      // Left arrow
      for (let x in this.xScale) {
        const newX =
          parseInt(x) - 1 < -this.centerIndex
            ? this.centerIndex
            : parseInt(x) - 1;

        temp[newX] = this.xScale[x];
      }
    }

    if (e.keyCode == 37) {
      // Right arrow
      for (let x in this.xScale) {
        const newX =
          parseInt(x) + 1 > this.centerIndex
            ? -this.centerIndex
            : parseInt(x) + 1;

        temp[newX] = this.xScale[x];
      }
    }

    this.xScale = temp;

    for (let x in temp) {
      const scale = this.calcScale(x),
        scale2 = this.calcScale2(x),
        leftPos = this.calcPos(x, scale2),
        zIndex = -Math.abs(x);

      this.updateCards(this.xScale[x], {
        x: x,
        scale: scale,
        leftPos: leftPos,
        zIndex: zIndex,

      });
    }
  }

  calcPos(x, scale) {
    let formula;

    if (x < 0) {
      formula = (scale * 100 - this.cardWidth) / 2;

      return formula;
    } else if (x > 0) {
      formula = 100 - (scale * 100 + this.cardWidth) / 2;

      return formula;
    } else {
      formula = 100 - (scale * 100 + this.cardWidth) / 2;

      return formula;
    }
  }
  updateCards(card, data) {
    //Add class for Position Absolute
    card.classList.add("card-slidemode");


    if (data.x || data.x == 0) {
      card.setAttribute("data-x", data.x);
    }

    if (data.scale || data.scale == 0) {
      card.style.transform = `scale(${data.scale})`;

      if (data.scale == 0) {
        card.style.opacity = data.scale;
      } else {
        card.style.opacity = 1;
      }
    }

    if (data.leftPos) {
      card.style.left = `${data.leftPos}%`;
    }
    if (data.zIndex || data.zIndex < 0) {
      if (data.zIndex < 0) {
        card.classList.remove("highlight");
        card.classList.add("card-blur");
      } else {
        card.classList.add("highlight");
        card.classList.remove("card-blur");
      }
    }
    if (data.zIndex || data.zIndex == 0) {
      if (data.zIndex == 0) {
        card.classList.add("highlight");
        card.classList.remove("card-blur");
      } else if (data.zIndex < 0) {
        card.classList.remove("highlight");
        card.classList.add("card-blur");
      } else {
        card.classList.remove("highlight");
        card.classList.remove("card-blur");
      }
      card.style.zIndex = data.zIndex;
    }
  }


  calcScale2(x) {
    let formula;

    if (x <= 0) {

      formula = 1 - (-1 / 3.5) * x;

      return formula;
    } else if (x > 0) {
      formula = 1 - (1 / 3.5) * x;


      return formula;
    }
  }

  calcScale(x) {
    const formula = 1 - (1 / 8) * Math.pow(x, 6);

    if (formula <= 0) {
      return 0;
    } else {
      return formula;
    }
  }

  checkOrdering(card, x, xDist) {
    const original = parseInt(card.dataset.x);
    const rounded = Math.round(xDist);
    let newX = x;

    if (x !== x + rounded) {
      if (x + rounded > original) {
        if (x + rounded > this.centerIndex) {
          newX =
            x + rounded - 1 - this.centerIndex - rounded + -this.centerIndex;
        }
      } else if (x + rounded < original) {
        if (x + rounded < -this.centerIndex) {
          newX =
            x + rounded + 1 + this.centerIndex - rounded + this.centerIndex;
        }
      }

      this.xScale[newX + rounded] = card;
    }

    const temp = -Math.abs(newX + rounded);

    this.updateCards(card, { zIndex: temp });

    return newX;
  }

  moveCards(data) {
    let xDist;

    if (data != null) {
      this.container.classList.remove("smooth-return");
      xDist = data.x / 300;
    } else {
      this.container.classList.add("smooth-return");
      xDist = 0;

      for (let x in this.xScale) {
        this.updateCards(this.xScale[x], {
          x: x,
          zIndex: Math.abs(Math.abs(x) - this.centerIndex),
        });
      }
    }

    for (let i = 0; i < this.cards.length; i++) {
      const x = this.checkOrdering(
        this.cards[i],
        parseInt(this.cards[i].dataset.x),
        xDist
      ),
        scale = this.calcScale(x + xDist),
        scale2 = this.calcScale2(x + xDist),
        leftPos = this.calcPos(x + xDist, scale2);

      this.updateCards(this.cards[i], {
        scale: scale,
        leftPos: leftPos,
      });
    }
  }

  slideLeft() {
    const temp = { ...this.xScale };
    for (let x in this.xScale) {
      const newX =
        parseInt(x) + 1 > this.centerIndex
          ? -this.centerIndex
          : parseInt(x) + 1;
      temp[newX] = this.xScale[x];
    }
    this.xScale = temp;
    for (let x in temp) {
      const scale = this.calcScale(x),
        scale2 = this.calcScale2(x),
        leftPos = this.calcPos(x, scale2),
        zIndex = -Math.abs(x);

      this.updateCards(this.xScale[x], {
        x: x,
        scale: scale,
        leftPos: leftPos,
        zIndex: zIndex,
      });
    }
  }

  slideRight() {
    const temp = { ...this.xScale };
    for (let x in this.xScale) {
      const newX =
        parseInt(x) - 1 < -this.centerIndex
          ? this.centerIndex
          : parseInt(x) - 1;
      temp[newX] = this.xScale[x];
    }
    this.xScale = temp;
    for (let x in temp) {
      const scale = this.calcScale(x),
        scale2 = this.calcScale2(x),
        leftPos = this.calcPos(x, scale2),
        zIndex = -Math.abs(x);

      this.updateCards(this.xScale[x], {
        x: x,
        scale: scale,
        leftPos: leftPos,
        zIndex: zIndex,
      });
    }
  }
}
const carousel = new CardCarousel(cardsContainer);
