let langs:any = {
    swe: require('../langs/swe.json'),
};

var defaultLang = 'swe';

export function _t(key: string, quantity?: number) {

    let translated = langs[defaultLang][key];
    if(translated) {
        return translated;
    } else {
        return key;
    }
}

