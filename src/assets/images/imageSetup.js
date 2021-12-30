import {open_floating} from "../../scripts/open_floating";

const imageArray =
  [
    {
      id: 'VKHeader',
      alt: 'Шапка ВК',
      imageLink: 'https://sun9-21.userapi.com/c850332/v850332545/c6686/guWm0ZskoqM.jpg'
    },
    {
      id: 'Argamach-Christmas',
      alt: 'Рождество 2021. Аргамач-Пальна, Елецкий район.',
      imageLink: 'https://sun9-5.userapi.com/impg/t65dsuGeBIAt77DEFvwWDkTvwTzjFru0KXs2Ug/nX8hXRYCOys.jpg?size=1600x1066&quality=96&proxy=1&sign=02db9f71b733de4408855c2e49793411&type=album'
    }
  ]

export function imageSet() {
  for (let i = 0; i < imageArray.length; i++) {
    try {
      let workingElement = document.getElementById(imageArray[i]["id"]);
      workingElement.children[0].src = imageArray[i]["imageLink"];
      workingElement.children[1].children[0].innerHTML = imageArray[i]["alt"];
      workingElement.onclick = function () {
        open_floating(imageArray[i]["imageLink"], imageArray[i]["alt"])
      };
    } catch (e) {
    }
  }
}
