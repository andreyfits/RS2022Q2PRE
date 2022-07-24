let requirements = `Итоговая оценка: 85/75.
1. Вёрстка соответствует макету. Ширина экрана 390px +48
    - блок header +6
    - секция preview +9
    - секция steps +9
    - секция destinations +9
    - секция stories +9
    - блок footer +6
2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
    - нет полосы прокрутки при ширине страницы от 1440рх до 390px +7
    - нет полосы прокрутки при ширине страницы от 390px до 320рх +8
3. На ширине экрана 390рх и меньше реализовано адаптивное меню +22
    - при ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка +2
    - при нажатии на бургер-иконку плавно появляется адаптивное меню +4
    - адаптивное меню соответствует макету +4
    - при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4
    - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4 (все кроме Account, она пока что просто закрывает меню)
    - при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4
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
