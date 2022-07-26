alert(`Если будут вопросы пишите. Мой дискорд andreyfits#0176`)

let requirements = `Итоговая оценка: 125/125.
1. Слайдер изображений в секции destinations +50
    - на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку + 20
    - Три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20
    - Анимации плавного перемещения для слайдера +10
2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50
    - логин попап соответствует верстке его закрытие происходит при клике вне попапа +25
    - логин попап имеет 2 инпута (email и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25
3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25
`;

console.log(requirements);

const menu = document.querySelector('.mobile-menu');
const toggle = document.querySelector('.toggle');
const cover = document.querySelector('.cover');
const close = document.querySelector('.close-icon');
const navList = document.querySelectorAll('.nav-link');

/*======================================== TOGGLE MENU ========================================*/
function openMenu() {
    menu.classList.add('active');
    cover.classList.add('open');
}

function closeMenu() {
    menu.classList.remove('active');
    cover.classList.remove('open');
}

/*======================================== CLICK EVENT ========================================*/
toggle.addEventListener('click', openMenu);
close.addEventListener('click', closeMenu);

navList.forEach(item => {
    item.addEventListener('click', closeMenu);
})

cover.addEventListener('click', (e) => {
    if (e.target !== menu && e.target !== toggle) {
        closeMenu();
    }
})

/*======================================== POPUP LOGIN ========================================*/
const loginBtn = document.querySelector('#btn-login');
const accountLink = document.querySelector('.account');
const login = document.querySelector('.login');
const wrapper = document.querySelector('.login__wrapper');
const darkenArea = document.querySelector('.darken-area');
const logInBtn = document.querySelector('.form-login__button');
const loginForm = document.querySelector('.form-login');

const registerLink = document.querySelector('#registerLink');
const loginList = document.querySelector('.login__list');
const loginLine = document.querySelector('.login__line');
const forgotLink = document.querySelector('.login__password-forgot-link');
const loginTitle = document.querySelector('.login__title');
const logInQuestionRegister = document.querySelector('.login__question-register');

function toggleLogin() {
    if (loginTitle.innerText === 'Create account') {
        editCss()
        logIn()
    }

    logInWrapper()

    login.classList.toggle('login--active');
    darkenArea.classList.toggle('darken');
}

loginBtn.addEventListener('click', toggleLogin);
accountLink.addEventListener('click', toggleLogin);
darkenArea.addEventListener('click', (e) => {
    if (e.target === darkenArea) {
        toggleLogin();
    }
});
loginForm.addEventListener('submit', (e) => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    alert('Email: ' + email + '\nPassword: '  + password);
    e.preventDefault();
    loginForm.reset();
    toggleLogin();
});

registerLink.addEventListener('click', editCss);
registerLink.addEventListener('click', signUp);

function editCss() {
    logInWrapper();
    setTimeout(logInWrapper, 500);
    login.classList.toggle('login--register');
    loginList.style.display = 'none';
    loginLine.style.display = 'none';
    forgotLink.style.display = 'none';
    loginForm.classList.toggle('login__form--register');
    logInQuestionRegister.classList.toggle('login__question-register--register');
    logInWrapper();
    logInWrapper();
}

function logInWrapper() {
    wrapper.classList.toggle('login__wrapper--register');
}

function signUp() {
    loginTitle.innerText = 'Create account';
    logInBtn.innerText = 'Sign Up';
    logInQuestionRegister.innerHTML = 'Don’t have an account? <a id="logInLink" href="#" class="register__link">Log In</a>';
    document.querySelector('#logInLink').addEventListener('click', editCss);
    document.querySelector('#logInLink').addEventListener('click', logIn);
}

function logIn() {
    loginTitle.innerText = 'Log in to your account';
    logInBtn.innerText = 'Sign In';
    loginList.style.display = 'flex';
    loginLine.style.display = 'flex';
    forgotLink.style.display = 'flex';
    logInQuestionRegister.innerHTML = 'Don’t have an account? <a id="registerLink" href="#" class="register__link">Register</a>';
    document.querySelector('#registerLink').addEventListener('click', editCss);
    document.querySelector('#registerLink').addEventListener('click', signUp);
}

/*======================================== SLIDER ========================================*/
const dots = document.querySelectorAll('.dot');
const next = document.querySelector('.right-arrow');
const previous = document.querySelector('.left-arrow');
const slideWindow = document.querySelector('.slider-inner');
const slides = document.querySelectorAll('.slide');
const slide = document.querySelector('.slide');

let shift = 0;

function slideMove(shift, i) {
    slideWindow.style.left = -shift + 'px';
    dots.forEach(el => el.classList.remove('active-dot'));
    dots[i].classList.add('active-dot');
}

slides.forEach((slide, i) => {
    slide.addEventListener('click', () => {
        slides.forEach(slide => {
            shift = (slide.clientWidth + slide.clientWidth * 0.0625) * (i - 1);
        });
        slideMove(shift, i)
    })
})

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        slides.forEach(slide => {
            shift = (slide.clientWidth + slide.clientWidth * 0.0625) * (i - 1);
        });
        slideMove(shift, i)
    })
})

next.addEventListener('click', () => {
    shift += slide.clientWidth + slide.clientWidth * 0.0625;
    if (shift > slide.clientWidth + slide.clientWidth * 0.0625) {
        shift = -(slide.clientWidth + slide.clientWidth * 0.0625);
    }
    dots.forEach((dot, i) => {
        if (dot.classList.contains('active-dot')) {
            (i === 2) ? ind = 0 : ind = i + 1;
        }
    })
    slideMove(shift, ind);
})

previous.addEventListener('click', () => {
    shift -= slide.clientWidth + slide.clientWidth * 0.0625;
    if (shift < -(slide.clientWidth + slide.clientWidth * 0.0625)) {
        shift = slide.clientWidth + slide.clientWidth * 0.0625;
    }
    dots.forEach((dot, i) => {
        if (dot.classList.contains('active-dot')) {
            (i === 0) ? ind = 2 : ind = i - 1;
        }
    })
    slideMove(shift, ind);
})
