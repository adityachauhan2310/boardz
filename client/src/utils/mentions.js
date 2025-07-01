export const MENTION_REGEX = /@\[(.*?)\]\((.*?)\)/g;
export const MENTION_NAME_REGEX = /@\[(.*?)\]\(.*?\)/g;

export const formatTextWithMentions = (text) => text.replace(MENTION_NAME_REGEX, '@$1');
