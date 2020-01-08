var life = 3;
var score = 0;
var nb_obj = 0;

var move = 10;

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
function move_obstacle() {
  setInterval(() => {
    var ennemy = document.querySelectorAll(".ennemy");
    for (let i = 0; i < ennemy.length; i++) {
      oxo.animation.move(ennemy[i], "left", move, true);
    }
  }, 10);
}

function move_item() {
  setInterval(() => {
    var item = document.querySelectorAll(".item");
    for (let i = 0; i < item.length; i++) {
      oxo.animation.move(item[i], "left", move, true);
    }
  }, 10);
}

function move_obj() {
  setInterval(() => {
    var obj = document.querySelectorAll(".obj");
    for (let i = 0; i < obj.length; i++) {
      oxo.animation.move(obj[i], "left", move, true);
    }
  }, 10);
}

function random_obstacle() {
  setInterval(() => {
    var ennemy = create("ennemy", 1900, 680);
  }, 5000);
}

function random_item() {
  setInterval(() => {
    var item = create("item", 1900, 690);
  }, 9000);
}

function random_obj() {
  setInterval(() => {
    var obj = create("obj", 1900, 690);
  }, 12000);
}

function clear_obstacle() {
  setInterval(() => {
    var ennemy = document.querySelectorAll(".ennemy");
    for (let i = 0; i < ennemy.length; i++) {
      oxo.elements.onLeaveScreen(
        ennemy[i],
        function() {
          ennemy[i].remove();
        },
        true
      );
    }
  }, 10);
}

function clear_item() {
  setInterval(() => {
    var item = document.querySelectorAll(".item");
    for (let i = 0; i < item.length; i++) {
      oxo.elements.onLeaveScreen(
        item[i],
        function() {
          item[i].remove();
        },
        true
      );
    }
  }, 10);
}

function clear_obj() {
  setInterval(() => {
    var obj = document.querySelectorAll(".obj");
    for (let i = 0; i < obj.length; i++) {
      oxo.elements.onLeaveScreen(
        obj[i],
        function() {
          obj[i].remove();
        },
        true
      );
    }
  }, 10);
}

function jump() {
  var character = document.querySelector(".character");
  oxo.inputs.listenKey("space", function() {
    if (!character.classList.contains("jump")) {
      character.classList.add("jump");
      setTimeout(() => {
        character.classList.remove("jump");
      }, 1500);
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

      if (life === 2) {
        health.style.width = "100px";
      }
      if (life === 1) {
        health.style.width = "50px";
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
  for (let i = 0; i < item.length; i++) {
    oxo.elements.onCollisionWithElement(character, item[i], function() {
      item[i].remove();
      life = life + 1;
      if (life === 3) {
        health.style.width = "150px";
      }
      if (life === 2) {
        health.style.width = "100px";
      }
      if (life === 0) {
        health.style.width = "0px";
      }
      if (life > 3) {
        life = 3;
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
      nb_obj = nb_obj + 1;

      if (nb_obj === 1) {
        obj_gauge.style.width = "28px";
      }
      if (nb_obj === 2) {
        obj_gauge.style.width = "56px";
      }
      if (nb_obj === 3) {
        obj_gauge.style.width = "84px";
      }
      if (nb_obj === 4) {
        obj_gauge.style.width = "112px";
      }
      if (nb_obj === 5) {
        obj_gauge.style.width = "150px";
      }
    });
  }
}

function time_score() {
  var score_txt = document.querySelector(".score_txt");
  score = score + 1;
  score_txt.innerHTML = "Score :" + score;
}

function display_final_score() {
  var display_score = document.querySelector(".final_score");
  display_score.innerHTML = "Votre Score: " + score;
  clearInterval(score_interval);
}

function lose() {
  if (life === 0) {
    oxo.screens.loadScreen("end", function() {
      display_final_score();
    });
  }
}

function game() {
  var character = document.querySelector(".character");
  oxo.animation.setPosition(character, { x: 100, y: 670 });
  random_obstacle();
  random_item();
  random_obj();
  move_obstacle();
  move_item();
  move_obj();
  setInterval(() => {
    collision_obstacle();
    collision_item();
    collision_obj();
  }, 100);
  jump();
  setInterval(() => {
    lose();
  }, 10);
  var score_interval = setInterval(() => {
    time_score();
  }, 500);
  time_score();
  clear_obstacle();
  clear_item();
  clear_obj();
}

oxo.inputs.listenKeyOnce("enter", function() {
  oxo.screens.loadScreen("game", function() {
    game();
  });
});
