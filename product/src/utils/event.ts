export const notifyEvent = (event_name: string) => {
    const event = new CustomEvent(event_name);
    window.dispatchEvent(event);
};
