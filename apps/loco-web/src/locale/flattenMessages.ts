interface NestedMessages {
  [key: string]: string | NestedMessages;
}

interface FlatMessages {
  [key: string]: string;
}

export const flattenMessages = (nestedMessages: NestedMessages, prefix: string = ''): FlatMessages => {
  return Object.keys(nestedMessages).reduce((messages: FlatMessages, key: string): FlatMessages => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object') {
      Object.assign(messages, flattenMessages(value as NestedMessages, prefixedKey));
    } else {
      messages[prefixedKey] = value as string;
    }

    return messages;
  }, {});
};
