/* eslint-disable quote-props */

import { groupBy, flatten } from 'underscore';

import {
    GREY,
    COLOR1,
    COLOR2,
    COLOR3,
    COLOR4,
    COLOR5,
    COLOR6,
    COLOR7,
    COLOR8,
    LISTE_EXG,
    LISTE_PC,
    LISTE_FG,
    LISTE_PG,
    LISTE_PS,
    LISTE_UG,
    LISTE_DVG,
    LISTE_EELV,
    LISTE_MODEM,
    LISTE_UC,
    LISTE_UDI,
    LISTE_DVD,
    LISTE_UD,
    LISTE_UMP,
    LISTE_FN,
    LISTE_EXD,
    LISTE_DIV,
    LISTE_SE,
    listColor,
} from '../style/color';

export const GENDER_LABELS = {
    Men:   COLOR1,
    Women: COLOR7,
};

export const CSP_LABELS = {
    'Agricultural':              COLOR6,
    'Private sector employees':  COLOR3,
    'Liberal profession':        COLOR8,
    'Education':                 COLOR5,
    'Public sector employees':   COLOR1,
    'Industrial and commercial': COLOR2,
    'Various':                   COLOR7,
    'Retired':                   COLOR4,
    'Unknown':                   GREY,
};

export const AGES_LABELS = {
    'Less than 29': COLOR1,
    '30 to 44':     COLOR2,
    '45 to 59':     COLOR3,
    '60 to 74':     COLOR4,
    '75 and more':  COLOR5,
    Unknown:        GREY,
};

export const POPULATION_LABELS = {
    Unknown:            GREY,
    '0 to 199':         COLOR1,
    '200 to 399':       COLOR2,
    '400 to 999':       COLOR3,
    '1 000 to 2 000':   COLOR4,
    '2 000 to 10 000':  COLOR5,
    'More than 10 000': COLOR6,
};

export const URBANITE_LABELS = {
    Unknown: GREY,
    Urban:   COLOR6,
    Rural:   COLOR7,
};

export const CHOMAGE_LABELS = {
    Unknown:              GREY,
    'Less than 5%':       COLOR1,
    'Between 5 and 10%':  COLOR2,
    'Between 10 and 15%': COLOR5,
    'More than 15%':      COLOR6,
};

export const LISTE_LABELS = {
    EXG:            LISTE_EXG,
    PC:             LISTE_PC,
    FG:             LISTE_FG,
    PG:             LISTE_PG,
    PS:             LISTE_PS,
    UG:             LISTE_UG,
    DVG:            LISTE_DVG,
    EELV:           LISTE_EELV,
    MODEM:          LISTE_MODEM,
    UC:             LISTE_UC,
    UDI:            LISTE_UDI,
    DVD:            LISTE_DVD,
    UD:             LISTE_UD,
    UMP:            LISTE_UMP,
    FN:             LISTE_FN,
    EXD:            LISTE_EXD,
    DIV:            LISTE_DIV,
    SE:             LISTE_SE,
    Inconnue:       LISTE_SE,
    'Pas de liste': GREY,
};

export const LISTE_LABELS_FULL = { // TODO Full names
    EXG:   'EXG',
    PC:    'PC',
    FG:    'FG',
    PG:    'PG',
    PS:    'PS',
    UG:    'UG',
    DVG:   'DVG',
    EELV:  'EELV',
    MODEM: 'MODEM',
    UC:    'UC',
    UDI:   'UDI',
    DVD:   'DVD',
    UD:    'UD',
    UMP:   'UMP',
    FN:    'FN',
    EXD:   'EXD',
    DIV:   'DIV',
    SE:    'No party',
};

export const TYPE_LABELS = {
    Other:                     GREY,
    Mayor:                     COLOR1,
    'Departmental councillor': COLOR2,
    'Regional councillor':     COLOR3,
    'Deputy Mayor':            COLOR4,
    'Deputy':                  COLOR5,
    'Senator':                 COLOR6,
};

const buildRawData = (labels, groups) => Object.keys(labels)
    .map((cat) => ({
        points: groups[cat] || [],
        value:  groups[cat] ? groups[cat].length : 0,
        label:  cat,
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
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.csp_name
    );

    return {
        data: buildRawData(CSP_LABELS, groups),
        max:  maxValueInGroups(groups),
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

export const buildListData = (supporters) => {
    // group then flatten to sort points
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.liste
    );

    const points = flatten(Object.values(groups));

    return {
        data: {
            points,
            labels: CSP_LABELS,
            colors: points.map((s) => listColor(s.data.liste)),
        },
    };
};

export const buildTypeData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.mandat
    );

    return {
        data: buildRawData(TYPE_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

