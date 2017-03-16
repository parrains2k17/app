
const candidatesPositions = {
    'ALLIOT-MARIE Michèle': {
        x: 150,
        y: 100,
    },
    'ARTHAUD Nathalie': {
        x: 150,
        y: 400,
    },
    'ASSELINEAU François': {
        x: 150,
        y: 800,
    },
    'CHEMINADE Jacques': {
        x: 2950,
        y: 400,
    },
    'DUPONT-AIGNAN Nicolas': {
        x: 550,
        y: 100,
    },
    'FAUDOT Bastien': {
        x: 550,
        y: 400,
    },
    'FILLON François': {
        x: 550,
        y: 800,
    },
    'GORGES Jean-Pierre': {
        x: 950,
        y: 100,
    },
    'GUAINO Henri': {
        x: 950,
        y: 400,
    },
    'HAMON Benoit': {
        x: 950,
        y: 800,
    },
    'JARDIN Alexandre': {
        x: 1350,
        y: 100,
    },
    'LARROUTUROU Pierre': {
        x: 1350,
        y: 400,
    },
    'LASSALLE Jean': {
        x: 1350,
        y: 800,
    },
    'LE PEN Marine': {
        x: 1750,
        y: 100,
    },
    'MACRON Emmanuel': {
        x: 1750,
        y: 400,
    },
    'MARCHANDISE Charlotte': {
        x: 1750,
        y: 800,
    },
    'MELENCHON Jean-Luc': {
        x: 2150,
        y: 100,
    },
    'POUTOU Philippe': {
        x: 2150,
        y: 400,
    },
    'TAUZIN Didier': {
        x: 2150,
        y: 800,
    },
    'TEMARU Oscar': {
        x: 2550,
        y: 250,
    },
    'YADE Rama': {
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

