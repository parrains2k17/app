
export const BLACK  = 0x000000;
export const WHITE  = 0xFFFFFF;

export const BLUE = 0x9DB4F8;
export const RED  = 0xFFD1D3;

export const LISTE_EXG      = 0x430201;
export const LISTE_PC       = 0xE90F00;
export const LISTE_FG       = 0xB10800;
export const LISTE_PG       = 0xBE0A00;
export const LISTE_PS       = 0xE80B56;
export const LISTE_UG       = 0xE13545;
export const LISTE_DVG      = 0xDA4968;
export const LISTE_EELV     = 0x3F8B22;
export const LISTE_MODEM    = 0xEB6300;
export const LISTE_UC       = 0x9BDAF9;
export const LISTE_UDI      = 0x82CBEC;
export const LISTE_DVD      = 0x4E8DD8;
export const LISTE_UD       = 0x3D6CC3;
export const LISTE_UMP      = 0x2552A5;
export const LISTE_FN       = 0x020B3D;
export const LISTE_EXD      = 0x000000; // TODO
export const LISTE_DIV      = 0xDDDDDD;
export const LISTE_SE       = 0x666666;

export const listColor = (list) => {
    switch (list) {
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
    default:
        return LISTE_SE;
    }
};

export const PARTI_LR = 0x0081c3;
export const PARTI_LUTTE = 0x9d0404;
export const PARTI_UNION_POP_REPU = 0xa5d8f6;
export const PARTI_SOLIDARITE = 0xee174b;
export const PARTI_DEBOUT = 0x70257b;
export const PARTI_MOUVEMENT_REP = 0xff92be;
export const PARTI_LA_FRANCE = 0xa5d8f6;
export const PARTI_PS = 0xee174b;
export const PARTI_APPEL_MOUVEMENT = 0xff92be;
export const PARTI_NOUVELLE_DONNE = 0xff92be;
export const PARTI_EX_MODEM = 0xa5d8f6;
export const PARTI_FN = 0x00456f;
export const PARTI_EN_MARCHE = 0xa5d8f6;
export const PARTI_VOIE_CITOYENNE = 0xd7d7d7;
export const PARTI_FR_INSOUMISE = 0xbc1415;
export const PARTI_ANTI_CAPITALISTE = 0x9d0404;
export const PARTI_RETABLIR_FR = 0xd7d7d7;
export const PARTI_TAVINI = 0xff92be;
export const PARTI_FR_OSE = 0xa5d8f6;

