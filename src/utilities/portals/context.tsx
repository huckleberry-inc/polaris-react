import {createContext, RefObject} from 'react';

import {PortalsContainerElement} from './types';

export interface PortalsManager {
  container: RefObject<PortalsContainerElement>;
}

export const PortalsManagerContext = createContext<PortalsManager | undefined>(
  undefined,
);
