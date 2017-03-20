
class Panel {
    constructor(classname, onClose) {
        this.panel = document.querySelector(classname);

        this.name = this.panel.querySelector('.js-candidate-name');
        this.parti = this.panel.querySelector('.js-candidate-parti');
        this.age = this.panel.querySelector('.js-candidate-age');
        this.total = this.panel.querySelector('.js-candidate-total');
        this.totalMaires = this.panel
            .querySelector('.js-candidate-totalMaires');
        this.image = this.panel.querySelector('.js-candidate-image');

        this.closeButton = this.panel.querySelector('.js-close-candidate');

        this.closeButton.addEventListener('click', onClose);
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

class CandidatePanel {
    constructor({
        container,
        panel1,
        panel2,
    }, onClose) {
        this.panelContainer = document.querySelector(container);
        this.panel1 = new Panel(panel1, () => onClose(0));
        this.panel2 = new Panel(panel2, () => onClose(1));
    }

    updateInfo(panel, info) {
        const p = panel === 0 ? this.panel1 : this.panel2;
        p.updateInfo(info);
    }

    open() {
        this.panelContainer.classList.add('mod-open');
    }

    openPanel(panel) {
        const p = panel === 0 ? this.panel1 : this.panel2;
        p.open();
    }

    reset() {
        this.panel1.close();
        this.panel2.close();
    }

    close() {
        this.panelContainer.classList.remove('mod-open');
        this.reset();
    }
}

export default CandidatePanel;
