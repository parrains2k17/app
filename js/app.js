
import AppController from './AppController';
import Modal from './components/Modal';
import Credits from './components/Credits'

require('../sass/styles.scss');

console.log(`🤖 Parrains2017 v${VERSION}`);// eslint-disable-line no-undef

const app = new AppController();

const modal = new Modal();
const credits = new Credits();

app.start();
