
export const BLACK  = 0x000000;
export const WHITE  = 0xFFFFFF;

export const BLUE = 0x9DB4F8;
export const RED  = 0xFFD1D3;


export const LISTE_DVG      = 0xFF92BE;
export const LISTE_MODEM    = 0xEF7323;
export const LISTE_EELV     = 0x7CA700;
export const LISTE_UDI      = 0x96ADD9;
export const LISTE_UC       = 0xEAEA13;
export const LISTE_EXG      = 0x9D0404;
export const LISTE_FG       = ;
export const LISTE_PC       = ;
export const LISTE_PG       = ;
export const LISTE_UG       = ;
export const LISTE_PS       = ;
export const LISTE_DIV      = ;
export const LISTE_DVD      = 0xA5D8F6;
export const LISTE_UMP      = ;
export const LISTE_UD       = ;
export const LISTE_FN       = 0x00456F;
export const LISTE_EXD      = 0x000000;
export const LISTE_SE       = 0xD7D7D7;

export const listColor = (list) => {
switch (list){
case 'LDVG':
    return LISTE_DVG;
case 'LDVD':
    return LISTE_DVD;
case 'LDIV':
    return LISTE_DIV;
case 'LUMP':
    return LISTE_UMP;
case 'LSOC':
    return LISTE_PS;
case 'LUG':
    return LISTE_UG;
case 'LUD':
    return LISTE_UD;
case 'LFN':
    return LISTE_FN;
case 'LUDI':
    return LISTE_UDI;
case 'LVEC':
    return LISTE_EELV;
case 'LFG':
    return LISTE_FG;
case 'LCOM':
    return LISTE_PC;
case 'LPG':
    return LISTE_PG;
case 'LUC':
    return LISTE_UC;
case 'LMDM':
    return LISTE_MODEM;
case 'LEXD':
    return LISTE_EXD;
case 'LEXG':
    return LISTE_EXG;
case '':
    return LISTE_SE;
}
};
