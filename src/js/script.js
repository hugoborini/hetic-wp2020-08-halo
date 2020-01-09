var life = 5;
var score = 0;
var nbObj = 0;
var nbObj2 = 0;
var intervalMove;
var randomObstacle;
var randomItem;
var randomObj;
var randomObj2;
var clearAll;
var collisionInterval;
var scoreInterval;

document.addEventListener("keydown", function(e) {
  if (e.keyCode === 32) {
    e.preventDefault();
  }
});

function createInterval() {
  intervalMove = setInterval(function() {
    moveElement(".ennemy", 6);
    moveElement(".item", 10);
    moveElement(".obj", 8);
    moveElement(".obj2", 8);
  }, 10);

  randomObstacle = setInterval(function() {
    create("ennemy", 1400, 640);
  }, 3000);
  randomItem = setInterval(function() {
    create("item", 1450, 350);
  }, 7000);

  randomObj = setInterval(function() {
    create("obj", 2000, 660);
  }, 5000);

  randomObj2 = setInterval(function() {
    create("obj2", 1600, 660);
  }, 8000);

  clearAll = setInterval(function() {
    clearAllObject(".ennemy");
    clearAllObject(".item");
    clearAllObject(".obj");
    clearAllObject(".obj2");
    console.log(nbObj2, nbObj);
    win();
    lose();
  }, 10);

  collisionInterval = setInterval(function() {
    collision_obstacle();
    collision_item();
    collision_obj();
    collision_obj2();
  }, 100);
  scoreInterval = setInterval(function() {
    timeScore();
  }, 500);
}

function clearAllInterval() {
  clearInterval(intervalMove);
  clearInterval(randomObstacle);
  clearInterval(randomItem);
  clearInterval(randomObj);
  clearInterval(randomObj2);
  clearInterval(clearAll);
  clearInterval(collisionInterval);
  clearInterval(scoreInterval);
}

function create(str, valx, valy) {
  var element = oxo.elements.createElement({
    type: "div",
    class: str,
    obstacle: false,
    appendTo: "body"
  });
  oxo.animation.setPosition(element, { x: valx, y: valy });

  return element;
}

function moveElement(className, int) {
  var element = document.querySelectorAll(className);
  for (let i = 0; i < element.length; i++) {
    oxo.animation.move(element[i], "left", int, true);
  }
}

function clearAllObject(className) {
  var element = document.querySelectorAll(className);
  for (let i = 0; i < element.length; i++) {
    oxo.elements.onLeaveScreen(
      element[i],
      function() {
        element[i].remove();
      },
      true
    );
  }
}

function jump() {
  var character = document.querySelector(".character");
  var soundJump = document.querySelector(".soundJump");

  oxo.inputs.listenKey("space", function() {
    if (!character.classList.contains("jump")) {
      soundJump.play();
      character.classList.add("jump");
      setTimeout(() => {
        character.classList.remove("jump");
      }, 1000);
    }
  });
}

function collision_obstacle() {
  var character = document.querySelector(".character");
  var ennemy = document.querySelectorAll(".ennemy");
  var health = document.querySelector(".health");
  for (let i = 0; i < ennemy.length; i++) {
    oxo.elements.onCollisionWithElement(character, ennemy[i], function() {
      ennemy[i].remove();
      life = life - 1;

      if (life === 5) {
        health.style.width = "200px";
      }
      if (life === 4) {
        health.style.width = "160px";
      }
      if (life === 3) {
        health.style.width = "120px";
      }
      if (life === 2) {
        health.style.width = "80px";
      }
      if (life === 1) {
        health.style.width = "40px";
      }
      if (life === 0) {
        health.style.width = "0px";
      }
    });
  }
}

function collision_item() {
  var character = document.querySelector(".character");
  var item = document.querySelectorAll(".item");
  var health = document.querySelector(".health");
  var soundAir = document.querySelector(".soundAir");
  for (let i = 0; i < item.length; i++) {
    oxo.elements.onCollisionWithElement(character, item[i], function() {
      soundAir.play();
      item[i].remove();
      life = life + 1;

      if (life === 5) {
        health.style.width = "200px";
      }
      if (life === 4) {
        health.style.width = "160px";
      }
      if (life === 3) {
        health.style.width = "120px";
      }
      if (life === 2) {
        health.style.width = "80px";
      }
      if (life === 1) {
        health.style.width = "40px";
      }
      if (life === 0) {
        health.style.width = "0px";
      }
      if (life > 5) {
        life = 5;
      }
    });
  }
}

function collision_obj() {
  var character = document.querySelector(".character");
  var obj = document.querySelectorAll(".obj");
  var obj_gauge = document.querySelector(".obj_gauge");
  for (let i = 0; i < obj.length; i++) {
    oxo.elements.onCollisionWithElement(character, obj[i], function() {
      obj[i].remove();
      nbObj = nbObj + 1;

      if (nbObj === 1) {
        obj_gauge.style.width = "33px";
      }
      if (nbObj === 2) {
        obj_gauge.style.width = "66px";
      }
      if (nbObj === 3) {
        obj_gauge.style.width = "99px";
      }
      if (nbObj === 4) {
        obj_gauge.style.width = "132px";
      }
      if (nbObj === 5) {
        obj_gauge.style.width = "200px";
      }
    });
  }
}

function collision_obj2() {
  var character = document.querySelector(".character");
  var obj2 = document.querySelectorAll(".obj2");
  var obj_gauge2 = document.querySelector(".obj_gauge2");
  for (let i = 0; i < obj2.length; i++) {
    oxo.elements.onCollisionWithElement(character, obj2[i], function() {
      obj2[i].remove();
      nbObj2 = nbObj2 + 1;

      if (nbObj2 === 1) {
        obj_gauge2.style.width = "33px";
      }
      if (nbObj2 === 2) {
        obj_gauge2.style.width = "66px";
      }
      if (nbObj2 === 3) {
        obj_gauge2.style.width = "99px";
      }
      if (nbObj2 === 4) {
        obj_gauge2.style.width = "132px";
      }
      if (nbObj2 === 5) {
        obj_gauge2.style.width = "200px";
      }
    });
  }
}

function timeScore() {
  var scoreTxt = document.querySelector(".score_txt");
  score = score + 1;
  scoreTxt.innerHTML = "<p class='score_txt'>Score :" + score + "</p>";
}

function displayFinalScore() {
  var scoreTxt = document.querySelector(".end--score");
  scoreTxt.innerHTML =
    "<div class='end--score'><p>Votre Score :" + score + "</p></div>";
}

function displayFinalScorewin() {
  var score_txt = document.querySelector(".htp__txt--win");

  score_txt.innerHTML =
    "<p class='htp__txt--win'> Votre Score :" + score + "</p>";
}

function lose() {
  if (life === 0) {
    oxo.screens.loadScreen("end", function() {
      end();
      clearAllInterval();
    });
  }
}

function win() {
  if (nbObj > 5) {
    nbObj = 5;
  }
  if (nbObj2 > 5) {
    nbObj2 = 5;
  }
  if (nbObj === 5 && nbObj2 === 5) {
    oxo.screens.loadScreen("win", function() {
      displayFinalScorewin();
      clearAllInterval();
      oxo.inputs.listenKeyOnce("enter", function() {
        oxo.screens.loadScreen("home", function() {
          home();
        });
      });
    });
  }
}

function game() {
  var character = document.querySelector(".character");
  oxo.animation.setPosition(character, { x: 100, y: 500 });
  createInterval();
  jump();
}

oxo.screens.loadScreen("home", function() {
  home();
});

function end() {
  var restartButton = document.querySelector(".restart");
  displayFinalScore();
  restartButton.addEventListener("click", function() {
    life = 5;
    oxo.screens.loadScreen("home", function() {
      home();
    });
  });
}

function history() {
  oxo.inputs.listenKeyOnce("enter", function() {
    oxo.screens.loadScreen("game", function() {
      game();
    });
  });
}

function home() {
  var playButton = document.querySelector(".play-button__button");
  playButton.addEventListener("click", function() {
    oxo.screens.loadScreen("history", function() {
      history();
    });
  });
}
