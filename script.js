
window.addEventListener('load', () => {
    const splash = document.querySelector('.splash-screen');
    splash.classList.add('fade-out');
    setTimeout(() => splash.remove(), 3000);
});
