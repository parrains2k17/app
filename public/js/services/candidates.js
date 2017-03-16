// TODO fetch API

const all = () => fetch('/data/parrainages.json')
                .then((json) => JSON.parse(json));

export default all;
