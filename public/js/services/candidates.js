
import {
    PARTI_LR,
    PARTI_LUTTE,
    PARTI_UNION_POP_REPU,
    PARTI_SOLIDARITE,
    PARTI_DEBOUT,
    PARTI_MOUVEMENT_REP,
    PARTI_LA_FRANCE,
    PARTI_PS,
    PARTI_APPEL_MOUVEMENT,
    PARTI_NOUVELLE_DONNE,
    PARTI_EX_MODEM,
    PARTI_FN,
    PARTI_EN_MARCHE,
    PARTI_VOIE_CITOYENNE,
    PARTI_FR_INSOUMISE,
    PARTI_ANTI_CAPITALISTE,
    PARTI_RETABLIR_FR,
    PARTI_TAVINI,
    PARTI_FR_OSE,
} from '../style/color';

const candidatesPositions = {
    'ALLIOT-MARIE Michèle': {
        name:  'Michèle Alliot-Marie',
        y:     100,
        parti: 'Les Républicains',
        age:   70,
        color: PARTI_LR,
    },
    'ARTHAUD Nathalie': {
        name:  'Nathalie Arthaud',
        x:     150,
        y:     400,
        parti: 'Lutte Ouvrière',
        age:   46,
        color: PARTI_LUTTE,
    },
    'ASSELINEAU François': {
        name:  'François Asselineau',
        x:     150,
        y:     800,
        parti: 'Union Populaire Républicaine',
        age:   59,
        color: PARTI_UNION_POP_REPU,
    },
    'CHEMINADE Jacques': {
        name:  'Jacques Cheminade',
        x:     2950,
        y:     400,
        parti: 'Solidarité et Progès',
        age:   75,
        color: PARTI_SOLIDARITE,
    },
    'DUPONT-AIGNAN Nicolas': {
        name:  'Nicolas Dupont-Aignan',
        x:     550,
        y:     100,
        parti: 'Debout la France',
        age:   55,
        color: PARTI_DEBOUT,
    },
    'FAUDOT Bastien': {
        name:  'Bastien Faudot',
        x:     550,
        y:     400,
        parti: 'Mouvement Républicain et Citoyen',
        age:   38,
        color: PARTI_MOUVEMENT_REP,
    },
    'FILLON François': {
        name:  'François Fillon',
        x:     550,
        y:     800,
        parti: 'Les Républicains',
        age:   63,
        color: PARTI_LR,
    },
    'GORGES Jean-Pierre': {
        name:  'Jean-Pierre Gorges',
        x:     950,
        y:     100,
        parti: 'La France c\'est vous !',
        age:   63,
        color: PARTI_LA_FRANCE,
    },
    'GUAINO Henri': {
        name:  'Henri Guaino',
        x:     950,
        y:     400,
        parti: 'Les Républicains',
        age:   60,
        color: PARTI_LR,
    },
    'HAMON Benoit': {
        name:  'Benoit Hamon',
        x:     950,
        y:     800,
        parti: 'Parti socialiste',
        age:   49,
        color: PARTI_PS,
    },
    'JARDIN Alexandre': {
        name:  'Alexandre Jardin',
        x:     1350,
        y:     100,
        parti: 'L\'Appel des Mouvements Citoyens',
        age:   51,
        color: PARTI_APPEL_MOUVEMENT,
    },
    'LARROUTUROU Pierre': {
        name:  'Pierre Larrouturou',
        x:     1350,
        y:     400,
        parti: 'Nouvelle Donne',
        age:   52,
        color: PARTI_NOUVELLE_DONNE,
    },
    'LASSALLE Jean': {
        name:  'Jean Lasalle',
        x:     1350,
        y:     800,
        parti: 'ex-MoDem',
        age:   61,
        color: PARTI_EX_MODEM,
    },
    'LE PEN Marine': {
        name:  'Marine Le Pen',
        x:     1750,
        y:     100,
        parti: 'Front National',
        age:   48,
        color: PARTI_FN,
    },
    'MACRON Emmanuel': {
        name:  'Emmanuel Macron',
        x:     1750,
        y:     400,
        parti: 'En Marche !',
        age:   39,
        color: PARTI_EN_MARCHE,
    },
    'MARCHANDISE Charlotte': {
        name:  'Charlotte Marchandise',
        x:     1750,
        y:     800,
        parti: 'La Voie Citoyenne',
        age:   42,
        color: PARTI_VOIE_CITOYENNE,
    },
    'MELENCHON Jean-Luc': {
        name:  'Jean-Luc Mélenchon',
        x:     2150,
        y:     100,
        parti: 'La France insoumise',
        age:   65,
        color: PARTI_FR_INSOUMISE,
    },
    'POUTOU Philippe': {
        name:  'Philippe Poutou',
        x:     2150,
        y:     400,
        parti: 'Nouveau parti anticapitaliste',
        age:   50,
        color: PARTI_ANTI_CAPITALISTE,
    },
    'TAUZIN Didier': {
        name:  'Didier Tauzin',
        x:     2150,
        y:     800,
        parti: 'Rétablir la France',
        age:   66,
        color: PARTI_RETABLIR_FR,
    },
    'TEMARU Oscar': {
        name:  'Oscar Temaru',
        x:     2550,
        y:     250,
        parti: 'Tavini Huiraatira',
        color: PARTI_TAVINI,
    },
    'YADE Rama': {
        name:  'Rama Yade',
        x:     2550,
        y:     600,
        parti: 'La France qui ose',
        age:   40,
        color: PARTI_FR_OSE,
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

