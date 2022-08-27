const buttonMen = document.querySelector('.header__button-gender_men');
const buttonWomen = document.querySelector('.header__button-gender_women');
const buttonText = document.querySelector('.header__button-change_text');
const buttonImage = document.querySelector('.header__button-change_back');
const body = document.body;
const cardImage = document.querySelector('.card__image');
const cardText = document.querySelector('.card__text');

const state = {
  gender: document.body.classList.contains('women') ? 'women' : 'men',
};

const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getData = () => {
  return fetch('db.json').then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
};

const changeDOM = () => {
  if (state.photo.includes('black')) {
    cardText.style.color = 'white';
  } else {
    cardText.style.color = '';
  }

  cardImage.src = `image/${state.photo}`;
  cardText.innerHTML = state.text.replaceAll('\n', '<br>');
};

const getDataToCard = () => {
  getData().then((data) => {
    state.photo = getRandom(data.photo[state.gender]);
    state.text = getRandom(data.text[state.gender]);
    changeDOM();
  });
};

const changeToMen = () => {
  if (state.gender !== 'men') {
    body.classList.add('men');
    body.classList.remove('women');
    state.gender = 'men';
    getDataToCard();
  }
};

const changeToWomen = () => {
  if (state.gender !== 'women') {
    body.classList.add('women');
    body.classList.remove('men');
    state.gender = 'women';
    getDataToCard();
  }
};

const changeText = () => {
  getData().then((data) => {
    state.text = getRandom(data.text[state.gender]);
    changeDOM();
  });
};

const changeImage = () => {
  getData().then((data) => {
    state.photo = getRandom(data.photo[state.gender]);
    changeDOM();
  });
};

buttonMen.addEventListener('click', changeToMen);
buttonWomen.addEventListener('click', changeToWomen);
buttonText.addEventListener('click', changeText);
buttonImage.addEventListener('click', changeImage);

getDataToCard();

const cardWrapper = document.querySelector('.card__wrapper');

cardWrapper.addEventListener('dblclick', () => {
  const newWindow = window.open(
    '',
    '',
    `width=840,height=520,top=${(screen.height / 2) - 520 / 2},
          left=${(screen.width / 2) - (840 / 2)}`,
  );

  html2canvas(cardWrapper).then((canvas) => {
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto'
    newWindow.document.body.append(canvas);
  });
});
