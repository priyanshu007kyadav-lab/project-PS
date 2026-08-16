let universe = null;
let cosmos = null;
let introStar = null;

export function registerUniverse(group) {
    universe = group;
}

export function getUniverse() {
    return universe;
}

export function registerCosmos(group) {
    cosmos = group;
}

export function getCosmos() {
    return cosmos;
}

export function registerIntroStar(group) {
    introStar = group;
}

export function getIntroStar() {
    return introStar;
}