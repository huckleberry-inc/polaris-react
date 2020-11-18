import React from 'react';

import {PortalsManagerContext} from '../../utilities/portals/context';

export interface PortalsManagerProps {
  children: React.ReactNode;
  container: HTMLElement | HTMLBodyElement | null;
}

export function PortalsManager({children, container}: PortalsManagerProps) {
  return (
    <PortalsManagerContext.Provider
      value={{
        container,
      }}
    >
      {children}
    </PortalsManagerContext.Provider>
  );
}
