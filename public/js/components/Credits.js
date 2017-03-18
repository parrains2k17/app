
class Credits {
    constructor() {
        this.credits = document.querySelector('.js-credits');
        this.credits_background = document
            .querySelector('.js-credits-background');

        this.openButton = document.querySelector('.js-open-credits');
        this.openButton.addEventListener('click', this.open.bind(this));

        this.credits_background
            .addEventListener('click', this.close.bind(this));
    }

    open() {
        this.credits.classList.add('mode-open');
        this.credits_background.classList.add('mode-open');
    }

    close() {
        this.credits.classList.remove('mode-open');
        this.credits_background.classList.remove('mode-open');
    }
}

export default Credits;
