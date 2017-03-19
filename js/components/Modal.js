
class Modal {
    constructor(type) {
        this.type = type;

        this.text_container = document
            .querySelector('.js-text-container');
        this.modal_container = document
            .querySelector('.js-modal_container_intro');
        this.text_container = document
            .querySelector('.js-text-container');
        this.closeButton = this.modal_container
            .querySelector('.js-close-modal');

        if (type === 'intro') {
            this.creditsButton = document
                .querySelector('.js-credits-link');
            this.modal_background = document
                .querySelector('.js-modal_background');
            this.closeButton
                .addEventListener('click', this.close.bind(this));
            // this.closeButton[1]
            //     .addEventListener('click', this.close.bind(this));
            this.modal_background
                .addEventListener('click', this.close.bind(this));

            this.open();
        } else if (type === 'webGL') {
            this.text_container_webGL = document
                .querySelector('.js-text-container-webGL');
            this.open();
        }

        console.log(this.modal_container);
    }

    open() {
        if (this.type === 'intro') {
            this.modal_background.classList.add('mode-open');
            this.modal_container.classList.add('mode-open');
            this.closeButton.classList.add('mode-open');
            this.creditsButton.classList.add('mode-open');
        } else if (this.type === 'webGL') {
            this.modal_container.classList.add('mode-open');
            console.log(this.modal_container);
            this.text_container.classList.remove('mode-open');
            this.text_container_webGL.classList.add('mode-open');
        }
        this.modal_container.classList.add('mode-animate');
    }

    close() {
        this.modal_background.classList.remove('mode-open');
        this.modal_container.classList.remove('mode-open');
    }
}


export default Modal;
