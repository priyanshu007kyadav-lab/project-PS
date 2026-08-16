let listeners = [];

export function subscribeTimeline(callback) {
    listeners.push(callback);

    return () => {
        listeners = listeners.filter(fn => fn !== callback);
    };
}

export function emitTimeline(event) {
    listeners.forEach(fn => fn(event));
}