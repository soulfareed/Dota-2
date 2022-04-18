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

        let domImage = `<div class="capacity"              data-unique="0${index}"
        data-id=${element.id}
        >
            <img
              class="capacity-img"
              src="${element.imageLink}"
              alt=""
              data-start="0"
              data-into = "${index}"

            />
            <div id="selected"></div>

          </div>`;

        $("#box-container1").append(domImage);
      }
    });
    let agility = [];
    data.agility.forEach((element, index) => {
      if (element.imageLink) {
        agility.push(element);
        let domImage = `<div class="capacity"               data-unique="1${index}"
        data-id=${element.id}
        >

              <img
                class="capacity-img"
                src="${element.imageLink}"
                alt=""
                data-start="1"
              data-into = "${index}"

              />
              <div id="selected"></div>

            </div>`;

        $("#box-container2").append(domImage);
      }
    });
    let intelligence = [];
    data.intelligence.forEach((element, index) => {
      if (element.imageLink) {
        intelligence.push(element);
        let domImage = `<div class="capacity"               data-unique="2${index}"
        data-id=${element.id}
        >

                <img
                  class="capacity-img"
                  src="${element.imageLink}"
                  alt=""
                  data-start="2"
              data-into = "${index}"

                />
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
const updateSelectedImage = () => {
  let list = document.querySelectorAll(".left-card  ");
  selectedCharArr.forEach((ele, index) => {
    // console.log(ele.childNodes);
    // if(index )
    list[index].querySelector(".score").textContent = ele.score;
    list[index].querySelector("img").src = ele.imageLink;
    list[index].querySelector(".card-text").textContent = ele.name;
  });
};
updateSelectedImage();
let uniqueD = [];
const runAfterImageLoaded = () => {
  putScore();
  console.log(allcharList);
  document.querySelectorAll(".capacity-img").forEach((ele, index) => {
    ele.addEventListener("click", (e) => {
      console.log(e);
      let dataAttrStart = e.target.getAttribute("data-start");
      let dataAttrInto = e.target.getAttribute("data-into");
      let unique = e.target.parentNode.getAttribute("data-unique");
      let se = e.target.parentNode.querySelector("#selected");
      updateDetailsCard(
        allcharList[dataAttrStart][dataAttrInto].id,
        allcharList[dataAttrStart][dataAttrInto].imageLink
      );
      if (selectedCharArr.length < 5) {
        se.classList.add("selected");
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
        });
        uniqueD.push(unique);
      }
      if (selectedCharArr.length === 5) {
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

const updateDetailsCard = (id, imageLink) => {
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
      console.log(finalHeroArr[0].relationShipHeroName);
      document.querySelector("#right-name").textContent =
        finalHeroArr[0].relationShipHeroName;

      document.querySelector(".top-img").src = imageLink;
      document.querySelector("#right-card-text").textContent =
        finalHeroArr[0].realtionShipDetails;
      console.log(finalHeroArr);
      // console.log(data);

      console.log("testaa", finalHeroArr[0]);
      document.querySelector("#l-name").textContent =
        finalHeroArr[0].relationShipHeroName;
    })
    .catch((error) => console.log("error", error));
};

const putScore = () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://tsq7xh8kp0.execute-api.us-east-2.amazonaws.com/hero-counters?enemyHeroes=hero-1,hero-110`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let data = JSON.parse(result).response.counterHeroes;
      // let data = console.log("score");
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
