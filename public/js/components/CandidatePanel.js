
class CandidatePanel {
    constructor(classname, onClick) {
        this.panel = document.querySelector(classname);

        this.name = document.querySelector('.js-candidate-name');
        this.parti = document.querySelector('.js-candidate-parti');
        this.age = document.querySelector('.js-candidate-age');
        this.total = document.querySelector('.js-candidate-total');
        this.totalMaires = document.querySelector('.js-candidate-totalMaires');
        this.image = document.querySelector('.js-candidate-image');

        this.closeButton = this.panel.querySelector('.js-close-candidate');

        this.closeButton.addEventListener('click', onClick);
    }

    updateInfo({
        name,
        total,
        totalMaires,
        parti,
        age,
        image,
    }) {
        this.name.innerText = name;
        this.total.innerText = total;
        this.totalMaires.innerText = totalMaires;
        this.parti.innerText = parti;
        this.age.innerText = age;
        this.image.src = image;
    }

    open() {
        this.panel.classList.add('mod-open');
    }

    close() {
        this.panel.classList.remove('mod-open');
    }
}

export default CandidatePanel;
