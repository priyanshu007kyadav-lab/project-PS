let moon = null;

export function registerMoon(ref) {
    moon = ref;
}

export function getMoon() {
    return moon;
}

export function showMoon() {
    if (moon?.current) {
        moon.current.visible = true;
    }
}

export function hideMoon() {
    if (moon?.current) {
        moon.current.visible = false;
    }
}