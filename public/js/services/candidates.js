
const candidatesPositions = {
    'ALLIOT-MARIE Michèle': {
        x: 0,
        y: 0,
    },
    'ARTHAUD Nathalie': {
        x: 0,
        y: 0,
    },
    'ASSELINEAU François': {
        x: 0,
        y: 0,
    },
    'CHEMINADE Jacques': {
        x: 0,
        y: 0,
    },
    'DUPONT-AIGNAN Nicolas': {
        x: 0,
        y: 0,
    },
    'FAUDOT Bastien': {
        x: 0,
        y: 0,
    },
    'FILLON François': {
        x: 0,
        y: 0,
    },
    'GORGES Jean-Pierre': {
        x: 0,
        y: 0,
    },
    'GUAINO Henri': {
        x: 0,
        y: 0,
    },
    'HAMON Benoit': {
        x: 0,
        y: 0,
    },
    'JARDIN Alexandre': {
        x: 0,
        y: 0,
    },
    'LARROUTUROU Pierre': {
        x: 0,
        y: 0,
    },
    'LASSALLE Jean': {
        x: 0,
        y: 0,
    },
    'LE PEN Marine': {
        x: 0,
        y: 0,
    },
    'MACRON Emmanuel': {
        x: 0,
        y: 0,
    },
    'MARCHANDISE Charlotte': {
        x: 0,
        y: 0,
    },
    'MELENCHON Jean-Luc': {
        x: 0,
        y: 0,
    },
    'POUTOU Philippe': {
        x: 0,
        y: 0,
    },
    'TAUZIN Didier': {
        x: 0,
        y: 0,
    },
    'TEMARU Oscar': {
        x: 0,
        y: 0,
    },
    'YADE Rama': {
        x: 0,
        y: 0,
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

