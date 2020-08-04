import React from 'react';
import { FeaturesContext } from '../../../../utilities/features';
import type { TabDescriptor } from '../../types';
export interface ListProps {
    focusIndex: number;
    disclosureTabs: TabDescriptor[];
    onClick?(id: string): void;
    onKeyPress?(event: React.KeyboardEvent<HTMLElement>): void;
}
export declare class List extends React.PureComponent<ListProps, never> {
    static contextType: React.Context<import("../../../../utilities/features").Features | undefined>;
    context: React.ContextType<typeof FeaturesContext>;
    render(): JSX.Element;
    private handleKeypress;
}