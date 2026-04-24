const Utils = {
    randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    chance(percent) {
        return Math.random() * 100 < percent;
    },
    showToast(msg, duration = 2000) {
        const toast = document.getElementById('toast-message');
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), duration);
    }
};
window.Utils = Utils;