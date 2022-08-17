export default () => {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            document.body.classList.add('load_state_hide');
        }, 2500);
        setTimeout(() => {
            document.body.classList.add('load');
            document.body.classList.remove('load');
        }, 3000);
        setTimeout(() => {
            const preloader = document.querySelector('.preloader');
            document.body.removeChild(preloader);
        }, 3500);
    });
};
