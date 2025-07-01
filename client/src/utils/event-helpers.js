import Config from '../constants/Config';

// eslint-disable-next-line import/prefer-default-export
export const isModifierKeyPressed = (event) => (Config.IS_MAC ? event.metaKey : event.ctrlKey);
