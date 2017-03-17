
const candidatesPositions = {
    'Michèle Alliot-Marie': {
        x: 150,
        y: 100,
    },
    'Nathalie Arthaud': {
        x: 150,
        y: 400,
    },
    'François Asselineau': {
        x: 150,
        y: 800,
    },
    'Jacques Cheminade': {
        x: 2950,
        y: 400,
    },
    'Nicolas Dupont-Aignan': {
        x: 550,
        y: 100,
    },
    'Bastien Faudot': {
        x: 550,
        y: 400,
    },
    'François Fillon': {
        x: 550,
        y: 800,
    },
    'Jean-Pierre Gorges': {
        x: 950,
        y: 100,
    },
    'Henri Guaino': {
        x: 950,
        y: 400,
    },
    'Benoit Hamon': {
        x: 950,
        y: 800,
    },
    'Alexandre Jardin': {
        x: 1350,
        y: 100,
    },
    'Pierre Larrouturou': {
        x: 1350,
        y: 400,
    },
    'Jean Lasalle': {
        x: 1350,
        y: 800,
    },
    'Marine Le Pen': {
        x: 1750,
        y: 100,
    },
    'Emmanuel Macron': {
        x: 1750,
        y: 400,
    },
    'Charlotte Marchandise': {
        x: 1750,
        y: 800,
    },
    'Jean-Luc Mélenchon': {
        x: 2150,
        y: 100,
    },
    'Philippe Poutou': {
        x: 2150,
        y: 400,
    },
    'Didier Tauzin': {
        x: 2150,
        y: 800,
    },
    'Oscar Temaru': {
        x: 2550,
        y: 250,
    },
    'Rama Yade': {
        x: 2550,
        y: 600,
    },
};

const all = () => fetch('/data/parrainages.json')
                .then((result) => result.json())
                .then((candidates) => {
                    Object.keys(candidates)
                        .forEach((key) => {
                            Object
                            .assign(candidates[key], candidatesPositions[key]);
                        });

                    return candidates;
                });

export default all;

