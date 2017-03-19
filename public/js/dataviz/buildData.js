
import { groupBy, flatten } from 'underscore';

import {
    GREY,
    COLOR1,
    COLOR2,
    COLOR3,
    COLOR4,
    COLOR5,
    COLOR6,
} from '../style/color';

export const GENDER_LABELS = {
    Hommes: COLOR1,
    Femmes: COLOR2,
};

export const CSP_NAME_COLOR = {
    'Professions agricoles':                     COLOR1,
    'Professions industrielles et commerciales': COLOR2,
    'Salariés du privé':                         COLOR3,
    'Professions libérales':                     COLOR4,
    'Professions de l\'enseignement':            COLOR5,
    'Personnels des entreprises publiques':      COLOR6,
    Divers:                                      COLOR1,
    Retraités:                                   COLOR2,
    Inconnue:                                    GREY,
};

export const AGES_LABELS = {
    'Moins de 29 ans': COLOR1,
    '30 à 44 ans':     COLOR2,
    '45 à 59 ans':     COLOR3,
    '60 à 74 ans':     COLOR4,
    '75 ans et plus':  COLOR5,
    Inconnu:           GREY,
};

export const POPULATION_LABELS = {
    Inconnue:                   GREY,
    '0 à 199 habitants':        COLOR1,
    '200 à 399 habitants':      COLOR2,
    '400 à 999 habitants':      COLOR3,
    '1 000 à 2 000 habitants':  COLOR4,
    '2 000 à 10 000 habitants': COLOR5,
    'Plus de 10 000 habitants': COLOR6,
};

export const URBANITE_LABELS = {
    Inconnu: GREY,
    urbaine: COLOR5,
    rurale:  COLOR6,
};

export const CHOMAGE_LABELS = {
    Inconnu:           GREY,
    'Moins de 5%':     COLOR1,
    'Entre 5 et 10%':  COLOR2,
    'Entre 10 et 15%': COLOR5,
    'Plus de 15%':     COLOR6,
};

const buildRawData = (labels, groups) => Object.keys(labels)
    .map((cat) => ({
        points: groups[cat],
        value:  groups[cat] ? groups[cat].length : 0,
        label:  cat,
        color:  labels[cat],
    }));

const maxValueInGroups = (groups) => Object.values(groups).reduce(
    (maxValue, group) => (
        group.length > maxValue
        ? group.length
        : maxValue
    ),
    0
);

export const buildGenderData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.sexe
    );

    return {
        data: buildRawData(GENDER_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

export const buildCSPData = (supporters) => {
    // group then flatten to sort points
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.csp_name
    );

    const points = flatten(Object.values(groups));

    return {
        data: {
            points,
            labels: CSP_NAME_COLOR,
            colors: points.map((s) => (
                CSP_NAME_COLOR[s.data.csp_name]
            )),
        },
    };
};

export const buildAgeData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.age_category
    );

    return {
        data: buildRawData(AGES_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

export const buildPopData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.population
    );

    return {
        data: buildRawData(POPULATION_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

export const buildUrbaniteData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.urbainite
    );

    return {
        data: buildRawData(URBANITE_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

export const buildChomageData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.chomage
    );

    return {
        data: buildRawData(CHOMAGE_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

