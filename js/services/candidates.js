
const candidatesPositions = {
    'ALLIOT-MARIE Michèle': {
        x:       150,
        y:       100,
        texture: 'images/Alliot-Marie.png',
    },
    'ARTHAUD Nathalie': {
        x:       150,
        y:       400,
        texture: 'images/Arthaud.png',
    },
    'ASSELINEAU François': {
        x:       150,
        y:       800,
        texture: 'images/Asselineau.png',
    },
    'CHEMINADE Jacques': {
        x:       2950,
        y:       400,
        texture: 'images/Cheminade.png',
    },
    'DUPONT-AIGNAN Nicolas': {
        x:       550,
        y:       100,
        texture: 'images/Dupont-Aignan.png',
    },
    'FAUDOT Bastien': {
        x:       550,
        y:       400,
        texture: 'images/Faudot.png',
    },
    'FILLON François': {
        x:       550,
        y:       800,
        texture: 'images/Fillon.png',
    },
    'GORGES Jean-Pierre': {
        x:       950,
        y:       100,
        texture: 'images/Gorges.png',
    },
    'GUAINO Henri': {
        x:       950,
        y:       400,
        texture: 'images/Guaino.png',
    },
    'HAMON Benoit': {
        x:       950,
        y:       800,
        texture: 'images/Hamon.png',
    },
    'JARDIN Alexandre': {
        x:       1350,
        y:       100,
        texture: 'images/Jardin.png',
    },
    'LARROUTUROU Pierre': {
        x:       1350,
        y:       400,
        texture: 'images/Larrouturou.png',
    },
    'LASSALLE Jean': {
        x:       1350,
        y:       800,
        texture: 'images/Lassalle.png',
    },
    'LE PEN Marine': {
        x:       1750,
        y:       100,
        texture: 'images/LePen.png',
    },
    'MACRON Emmanuel': {
        x:       1750,
        y:       400,
        texture: 'images/Macron.png',
    },
    'MARCHANDISE Charlotte': {
        x:       1750,
        y:       800,
        texture: 'images/Marchandise.png',
    },
    'MELENCHON Jean-Luc': {
        x:       2150,
        y:       100,
        texture: 'images/Melenchon.png',
    },
    'POUTOU Philippe': {
        x:       2150,
        y:       400,
        texture: 'images/Poutou.png',
    },
    'TAUZIN Didier': {
        x:       2150,
        y:       800,
        texture: 'images/Tauzin.png',
    },
    'TEMARU Oscar': {
        x:       2550,
        y:       250,
        texture: 'images/Temaru.png',
    },
    'YADE Rama': {
        x:       2550,
        y:       600,
        texture: 'images/Yade.png',
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

