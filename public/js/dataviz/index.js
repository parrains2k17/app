/* eslint-disable max-len */

export const SELECTOR_GENDER   = 'SELECTOR_GENDER';
export const SELECTOR_AGE      = 'SELECTOR_AGE';
export const SELECTOR_CSP      = 'SELECTOR_CSP';
export const SELECTOR_POP      = 'SELECTOR_POP';
export const SELECTOR_URBANITE = 'SELECTOR_URBANITE';
export const SELECTOR_CHOMAGE  = 'SELECTOR_CHOMAGE';
export const SELECTOR_LISTE    = 'SELECTOR_LISTE';

export const SELECTOR_TYPE       = 'SELECTOR_TYPE';
export const SELECTOR_GENDER_ALL = 'SELECTOR_GENDER_ALL';

export const mairesOnly = (selector) => (
    selector !== SELECTOR_TYPE && selector !== SELECTOR_GENDER_ALL
);

export const SELECTOR_TITLES   = {
    [SELECTOR_GENDER]:     'Distribution of supporters by gender',
    [SELECTOR_AGE]:        'Distribution of supporters by age',
    [SELECTOR_CSP]:        'Distribution of supporters by socio-professional category',
    [SELECTOR_POP]:        'Population in cities of the supporters',
    [SELECTOR_URBANITE]:   'Distribution of supporters cities between urban and rural one',
    [SELECTOR_CHOMAGE]:    'Distribution of supporters cities according to the unemployment rate of their area',
    [SELECTOR_LISTE]:      'Distribution of supporters political colors',
    [SELECTOR_GENDER_ALL]: 'Distribution of supporters by gender',
    [SELECTOR_TYPE]:       'Distribution of supporters by their type of mandate',
};
