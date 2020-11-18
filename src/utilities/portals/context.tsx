import {createContext} from 'react';

export interface PortalsManager {
  container: HTMLElement | HTMLBodyElement | null;
}

export const PortalsManagerContext = createContext<PortalsManager | undefined>(
  undefined,
);
