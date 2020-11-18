import React, {RefObject} from 'react';

import {
  PortalsManagerContext,
  PortalsContainerElement,
} from '../../utilities/portals';

export interface PortalsManagerProps {
  children: React.ReactNode;
  container: RefObject<PortalsContainerElement>;
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
