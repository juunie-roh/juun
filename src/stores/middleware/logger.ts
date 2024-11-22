import type { StateCreator, StoreMutatorIdentifier } from 'zustand';

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    set(...(a as Parameters<typeof set>));
    console.log(
      '🚀 ~ State Logger ~ set:',
      ...(name ? [`${name}:`] : []),
      get(),
    );
  };
  const setState = store.setState;
  store.setState = (...a) => {
    setState(...(a as Parameters<typeof setState>));
    console.log(
      '🚀 ~ State Logger ~ store.setState:',
      ...(name ? [`${name}:`] : []),
      store.getState(),
    );
  };

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;
