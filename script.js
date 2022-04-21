var requestOptions = {
  method: "GET",
  redirect: "follow",
};
let allcharList = [];

let scores = [];
fetch(
  "https://tsq7xh8kp0.execute-api.us-east-2.amazonaws.com/heroes",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    let data = JSON.parse(result);
    console.log(data);
    let strength = [];
    data.strength.forEach((element, index) => {
      if (element.imageLink) {
        strength.push(element);

        let domImage = `<div class="capacity"     data-start="0"   id="${element.id}"       data-unique="0${index}"
        data-id=${element.id}     data-into = "${index}"
        >
        <div class="score"></div>

            <img
              class="capacity-img"
              src="${element.imageLink}"
              alt=""
              data-start="0"
              data-into = "${index}"

            />
            <div class="centered">
          <button type="button" class="player-btn btn btn-secondary" data-unique="0${index}" 
            data-id=${element.id}  data-start="0" data-into="${index}"><span data-unique="0${index}" data-id=${element.id}  data-start="0" data-into="${index}">player
            </span></button>
          <button type="button" class="enemy-btn btn btn-secondary " data-unique="0${index}" data-id=${element.id}  data-start="0" data-into="${index}"><span data-unique="0${index}" data-id=${element.id}  data-start="0" data-into="${index}">enemy
            </span></button>
          <button type="button" class="view-btn btn btn-secondary " data-unique="0${index}" data-id=${element.id}  data-start="0" data-into="${index}"><span data-unique="0${index}" data-id=${element.id}  data-start="0" data-into="${index}">view
            </span></button>
        </div>
            <div id="selected"></div>

          </div>`;

        $("#box-container1").append(domImage);
      }
    });
    let agility = [];
    data.agility.forEach((element, index) => {
      if (element.imageLink) {
        agility.push(element);
        let domImage = `<div class="capacity"    id="${element.id}"    data-start="1"        data-unique="1${index}"
        data-id=${element.id}  data-into = "${index}"
        >
        <div class="score"></div>

              <img
                class="capacity-img"
                src="${element.imageLink}"
                alt=""
                data-start="1"
              data-into = "${index}"

              />
              <div class="centered">
              <button type="button" class="player-btn btn btn-secondary" data-unique="1${index}"
                data-id=${element.id}  data-start="1" data-into="${index}"><span data-unique="1${index}"
                data-id=${element.id}  data-start="1" data-into="${index}">player
                </span></button>
              <button type="button" class="enemy-btn btn btn-secondary " data-unique="1${index}" data-id=${element.id} data-start="1" data-into="${index}"><span data-unique="1${index}" data-id=${element.id} data-start="1" data-into="${index}">enemy
                </span></button>
              <button type="button" class="view-btn btn btn-secondary " data-unique="1${index}" data-id=${element.id} data-start="1" data-into="${index}"><span data-unique="1${index}" data-id=${element.id} data-start="1" data-into="${index}">view
                </span></button>
            </div>
              <div id="selected"></div>

            </div>`;

        $("#box-container2").append(domImage);
      }
    });
    let intelligence = [];
    data.intelligence.forEach((element, index) => {
      if (element.imageLink) {
        intelligence.push(element);
        let domImage = `<div class="capacity"  id="${element.id}" data-unique="2${index}" data-start="2" data-id=${element.id} data-into="${index}">
        <div class="score"></div>

        <img class="capacity-img" src="${element.imageLink}" alt="" data-start="2" data-into="${index}" />
        <div class="centered">
          <button type="button" class="player-btn btn btn-secondary" data-unique="2${index}"
            data-id=${element.id} data-start="2" data-into="${index}"><span  data-unique="2${index}"
            data-id=${element.id} data-start="2" data-into="${index}">player
            </span></button>
          <button type="button" class="enemy-btn btn btn-secondary " data-unique="2${index}" data-id=${element.id}  data-start="2" data-into="${index}"><span  data-unique="2${index}"
          data-id=${element.id} data-start="2" data-into="${index}">enemy
            </span></button>
          <button type="button" class="view-btn btn btn-secondary " data-unique="2${index}" data-id=${element.id}  data-start="2" data-into="${index}"><span  data-unique="2${index}"
          data-id=${element.id} data-start="2" data-into="${index}">view
            </span></button>
        </div>
      
   
      <div id="selected"></div>
      </div>`;

        $("#box-container3").append(domImage);
      }
    });
    allcharList.push(strength, agility, intelligence);
    console.log(allcharList);
    runAfterImageLoaded();
  })
  .catch((error) => console.log("error", error));

let selectedCharArr = [];
let selectedCharArrEnemy = [];

const OnSelect = () => {
  let list = document.querySelectorAll(".left-card");
  list.forEach((ele, index) => {
    // console.log(ele.querySelector(".centered"));
    ele
      .querySelector(".centered")
      .childNodes[1].addEventListener("click", () => {
        if (
          selectedCharArr.length - 1 === index ||
          selectedCharArr.length - 1 > index
        ) {
          console.log(selectedCharArr, index);
          removeFromList("left", index);
        }
      });

    ele
      .querySelector(".centered")
      .childNodes[3].addEventListener("click", () => {
        if (
          selectedCharArr.length - 1 === index ||
          selectedCharArr.length - 1 > index
        ) {
          updateDetailsCard(
            selectedCharArr[index].id,
            selectedCharArr[index].imageLink,
            selectedCharArr[index]
          );
        }
      });
  });
  let listright = document.querySelectorAll(".right-card");
  listright.forEach((ele, index) => {
    ele
      .querySelector(".centered")
      .childNodes[1].addEventListener("click", () => {
        if (
          selectedCharArrEnemy.length - 1 === index ||
          selectedCharArrEnemy.length - 1 > index
        ) {
          console.log(selectedCharArrEnemy, index);
          removeFromList("right", index);
        }
      });
    ele
      .querySelector(".centered")
      .childNodes[3].addEventListener("click", () => {
        if (
          selectedCharArrEnemy.length - 1 === index ||
          selectedCharArrEnemy.length - 1 > index
        ) {
          console.log(selectedCharArrEnemy, index);
          updateDetailsCard(
            selectedCharArrEnemy[index].id,
            selectedCharArrEnemy[index].imageLink,
            selectedCharArrEnemy[index]
          );
        }
      });
  });
};
OnSelect();

const removeFromList = (name, index) => {
  let m = [];
  if (name === "left") {
    selectedCharArr = selectedCharArr.filter((ele, indexList) => {
      if (index !== indexList) {
        return true;
      }
      return false;
    });
    console.log(selectedCharArr);
  }
  if (name === "right") {
    selectedCharArrEnemy = selectedCharArrEnemy.filter((ele, indexList) => {
      if (index !== indexList) {
        return true;
      }
      return false;
    });
    console.log(selectedCharArrEnemy);
  }
  if (selectedCharArr.length === 5 && selectedCharArrEnemy.length === 5) {
    document.querySelectorAll(".capacity").forEach((ele1) => {
      let unique = ele1.getAttribute("data-unique");
      if (!uniqueD.includes(unique)) {
        ele1.style.opacity = "0.4";
      }
    });
  } else {
    document.querySelectorAll(".capacity").forEach((ele1) => {
      let unique = ele1.getAttribute("data-unique");
      if (!uniqueD.includes(unique)) {
        ele1.style.opacity = "1";
      }
    });
  }
  updateSelectedImage();
};

const updateSelectedImage = () => {
  let list = document.querySelectorAll(".left-card");
  selectedCharArr.forEach((ele, index) => {
    // console.log(ele.childNodes);
    // if(index )
    // list[index].querySelector(".score").textContent = ele.score;
    list[index].querySelector("img").src = ele.imageLink;
    list[index].querySelector(".card-text").textContent = ele.name;
    list[index].classList.add("hover_effect");
  });

  let listright = document.querySelectorAll(".right-card");
  selectedCharArrEnemy.forEach((ele, index) => {
    // console.log(ele.childNodes);
    // if(index )
    // listright[index].querySelector(".score").textContent = ele.score;
    listright[index].querySelector("img").src = ele.imageLink;
    listright[index].querySelector(".card-text").textContent = ele.name;
    listright[index].classList.add("hover_effect");
  });

  console.log(selectedCharArr.length, list.length);
  if (selectedCharArr.length !== list.length) {
    list.forEach((ele, index) => {
      if (index > selectedCharArr.length || index === selectedCharArr.length) {
        list[index].querySelector("img").src = "./placeholder.png";
        list[index].querySelector(".card-text").textContent = "";
        list[index].classList.remove("hover_effect");
      }
    });
  }
  if (selectedCharArrEnemy.length !== listright.length) {
    listright.forEach((ele, index) => {
      if (
        index > selectedCharArrEnemy.length ||
        index === selectedCharArrEnemy.length
      ) {
        listright[index].querySelector("img").src = "./placeholder.png";
        listright[index].querySelector(".card-text").textContent = "";
        listright[index].classList.remove("hover_effect");
      }
    });
  }
};
updateSelectedImage();
let uniqueD = [];
const runAfterImageLoaded = () => {
  // putScore();
  console.log(allcharList);
  document.querySelectorAll(".capacity").forEach((ele, index) => {
    ele.querySelector(".enemy-btn").addEventListener("click", (e) => {
      console.log(e);
      let dataAttrStart = e.target.getAttribute("data-start");
      let dataAttrInto = e.target.getAttribute("data-into");
      let unique = e.target.parentNode.getAttribute("data-unique");
      let id = e.target.getAttribute("data-id");
      let se =
        e.target.parentNode.parentNode.parentNode.querySelector("#selected");
      document.querySelector(`#${id}`).style.opacity = "0.5";
      // updateDetailsCard(
      //   allcharList[dataAttrStart][dataAttrInto].id,
      //   allcharList[dataAttrStart][dataAttrInto].imageLink
      // );
      putScore(allcharList[dataAttrStart][dataAttrInto].id);
      if (selectedCharArrEnemy.length < 5) {
        // se.classList.add("selected");
        // get score
        selectedScore = "0";
        scores.forEach((score) => {
          if (score.heroId === allcharList[dataAttrStart][dataAttrInto].id) {
            selectedScore = score.score;
          }
        });
        // get score end
        selectedCharArrEnemy.push({
          score: selectedScore,
          imageLink: allcharList[dataAttrStart][dataAttrInto].imageLink,
          name: allcharList[dataAttrStart][dataAttrInto].name,
          id: id,
        });
        uniqueD.push(unique);
      }
      if (selectedCharArr.length === 5 && selectedCharArrEnemy.length === 5) {
        document.querySelectorAll(".capacity").forEach((ele1) => {
          let unique = ele1.getAttribute("data-unique");
          if (!uniqueD.includes(unique)) {
            ele1.style.opacity = "0.4";
          }
        });
      }
      updateSelectedImage();
    });
    ele.querySelector(".player-btn").addEventListener("click", (e) => {
      console.log(e);
      let dataAttrStart = e.target.getAttribute("data-start");
      let dataAttrInto = e.target.getAttribute("data-into");
      let unique = e.target.parentNode.getAttribute("data-unique");
      let id = e.target.getAttribute("data-id");
      let se =
        e.target.parentNode.parentNode.parentNode.querySelector("#selected");
      document.querySelector(`#${id}`).style.opacity = "0.5";
      // updateDetailsCard(
      //   allcharList[dataAttrStart][dataAttrInto].id,
      //   allcharList[dataAttrStart][dataAttrInto].imageLink
      // );
      putScore(allcharList[dataAttrStart][dataAttrInto].id);
      if (selectedCharArr.length < 5) {
        // se.classList.add("selected");
        // get score
        selectedScore = "0";
        scores.forEach((score) => {
          if (score.heroId === allcharList[dataAttrStart][dataAttrInto].id) {
            selectedScore = score.score;
          }
        });
        // get score end
        selectedCharArr.push({
          score: selectedScore,
          imageLink: allcharList[dataAttrStart][dataAttrInto].imageLink,
          name: allcharList[dataAttrStart][dataAttrInto].name,
          id: id,
        });
        uniqueD.push(unique);
      }
      if (selectedCharArr.length === 5 && selectedCharArrEnemy.length === 5) {
        document.querySelectorAll(".capacity").forEach((ele1) => {
          let unique = ele1.getAttribute("data-unique");
          if (!uniqueD.includes(unique)) {
            ele1.style.opacity = "0.4";
          }
        });
      }
      updateSelectedImage();
    });
    ele.querySelector(".view-btn").addEventListener("click", (e) => {
      console.log(e);
      let dataAttrStart = e.target.getAttribute("data-start");
      let dataAttrInto = e.target.getAttribute("data-into");
      let unique = e.target.parentNode.getAttribute("data-unique");
      let se =
        e.target.parentNode.parentNode.parentNode.querySelector("#selected");
      updateDetailsCard(
        allcharList[dataAttrStart][dataAttrInto].id,
        allcharList[dataAttrStart][dataAttrInto].imageLink,
        allcharList[dataAttrStart][dataAttrInto]
      );

      if (selectedCharArr.length === 5 && selectedCharArrEnemy.length === 5) {
        document.querySelectorAll(".capacity").forEach((ele1) => {
          let unique = ele1.getAttribute("data-unique");
          if (!uniqueD.includes(unique)) {
            ele1.style.opacity = "0.4";
          }
        });
      }
      updateSelectedImage();
    });
  });
};

const updateDetailsCard = (id, imageLink, allData) => {
  document.querySelector("#suggestionPlayer").innerHTML = "";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://tsq7xh8kp0.execute-api.us-east-2.amazonaws.com/hero-counter-details/${id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let data = JSON.parse(result);
      let finalHeroArr = [];
      data.forEach((ele, index) => {
        if (ele.heroId === id) {
          finalHeroArr.push(ele);
        }
      });

      finalHeroArr.forEach((ele, index) => {
        let imgLink = "";
        document.querySelectorAll(".capacity").forEach((domEle) => {
          let unique = domEle.getAttribute("data-id");
          if (unique === ele.relationShipHeroId) {
            let dataAttrStart = domEle.getAttribute("data-start");
            let dataAttrInto = domEle.getAttribute("data-into");
            console.log(dataAttrInto, dataAttrStart);
            imgLink = allcharList[dataAttrStart][dataAttrInto].imageLink;
          }
        });
        let backgroundColor = "red";
        if (ele.relationShipType === "GoodAgainst") {
          backgroundColor = "green";
        }
        if (ele.relationShipType === "WorksWellWith") {
          backgroundColor = "yellow";
        }
        let html = ` <div class="card mt-2">
        <div class="card-body" style="background-color: ${backgroundColor};flex:none">
        <h5 class="text-center ">${ele.relationShipHeroName}</h5>
          <div class="row">
            <div class="col-4">
              <img class="card-img-top"
                src="${imgLink}"
                alt="Card image cap">
            </div>
            <div class="col-8">
              <div class="d-flex ">
                <h5 class="card-title mt-auto mb-auto mr-2 mb-2">${ele.relationShipType}</h5>
                <img class="Middle-img"
                  src="${imageLink}" alt="" />
              </div>

              <p class="card-text">${ele.realtionShipDetails}</p>
              <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
            </div>
          </div>

        </div>
      </div>`;

        $("#suggestionPlayer").append(html);
      });

      console.log(finalHeroArr);
      document.querySelector("#right-name").textContent = allData.name;

      document.querySelector(".top-img").src = imageLink;
      // document.querySelector("#right-card-text").textContent =
      //   finalHeroArr[0].realtionShipDetails;
      // console.log(finalHeroArr);
      // // console.log(data);

      // console.log("testaa", finalHeroArr[0]);
      // document.querySelector("#l-name").textContent =
      //   finalHeroArr[0].relationShipHeroName;
    })
    .catch((error) => console.log("error", error));
};

const putScore = (id) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://tsq7xh8kp0.execute-api.us-east-2.amazonaws.com/hero-counters?enemyHeroes=${id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let data = JSON.parse(result).response.counterHeroes;
      // let data = console.log("score");
      // clear all hightlight users
      document.querySelectorAll(".capacity").forEach((ele, index) => {
        ele.querySelector(".capacity-img").style.border = "none";
      });
      // select top 10 score by highlight border
      data.forEach((score, indexScore) => {
        document.querySelectorAll(".capacity").forEach((ele, index) => {
          if (indexScore < 10) {
            let unique = ele.getAttribute("data-id");
            if (unique === score.heroId) {
              ele.querySelector(".capacity-img").style.border = "2px solid red";
            }
          }
        });
      });
      document.querySelectorAll(".capacity").forEach((ele, index) => {
        let unique = ele.getAttribute("data-id");
        let indi = [];
        data.forEach((score, ind) => {
          if (score.heroId === unique) {
            indi.push(score);
          }
        });
        ele.querySelector(".score").textContent =
          indi.length > 0 ? indi[0].score : "0";
      });
      scores = data;
    })
    .catch((error) => console.log("error", error));
};

var current_time = setInterval(function () {
  system_time();
}, 1000);
function system_time() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  document.getElementById("current_time").innerHTML =
    ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2);
}
