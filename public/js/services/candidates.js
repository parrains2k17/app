
const candidatesPositions = {
    'ALLIOT-MARIE Michèle': {
        name: 'Michèle Alliot-Marie',
        x:    150,
        y:    100,
    },
    'ARTHAUD Nathalie': {
        name: 'Nathalie Arthaud',
        x:    150,
        y:    400,
    },
    'ASSELINEAU François': {
        name: 'François Asselineau',
        x:    150,
        y:    800,
    },
    'CHEMINADE Jacques': {
        name: 'Jacques Cheminade',
        x:    2950,
        y:    400,
    },
    'DUPONT-AIGNAN Nicolas': {
        name: 'Nicolas Dupont-Aignan',
        x:    550,
        y:    100,
    },
    'FAUDOT Bastien': {
        name: 'Bastien Faudot',
        x:    550,
        y:    400,
    },
    'FILLON François': {
        name: 'François Fillon',
        x:    550,
        y:    800,
    },
    'GORGES Jean-Pierre': {
        name: 'Jean-Pierre Gorges',
        x:    950,
        y:    100,
    },
    'GUAINO Henri': {
        name: 'Henri Guaino',
        x:    950,
        y:    400,
    },
    'HAMON Benoit': {
        name: 'Benoit Hamon',
        x:    950,
        y:    800,
    },
    'JARDIN Alexandre': {
        name: 'Alexandre Jardin',
        x:    1350,
        y:    100,
    },
    'LARROUTUROU Pierre': {
        name: 'Pierre Larrouturou',
        x:    1350,
        y:    400,
    },
    'LASSALLE Jean': {
        name: 'Jean Lasalle',
        x:    1350,
        y:    800,
    },
    'LE PEN Marine': {
        name: 'Marine Le Pen',
        x:    1750,
        y:    100,
    },
    'MACRON Emmanuel': {
        name: 'Emmanuel Macron',
        x:    1750,
        y:    400,
    },
    'MARCHANDISE Charlotte': {
        name: 'Charlotte Marchandise',
        x:    1750,
        y:    800,
    },
    'MELENCHON Jean-Luc': {
        name: 'Jean-Luc Mélenchon',
        x:    2150,
        y:    100,
    },
    'POUTOU Philippe': {
        name: 'Philippe Poutou',
        x:    2150,
        y:    400,
    },
    'TAUZIN Didier': {
        name: 'Didier Tauzin',
        x:    2150,
        y:    800,
    },
    'TEMARU Oscar': {
        name: 'Oscar Temaru',
        x:    2550,
        y:    250,
    },
    'YADE Rama': {
        name: 'Rama Yade',
        x:    2550,
        y:    600,
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

