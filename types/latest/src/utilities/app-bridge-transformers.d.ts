import type { ClientApplication } from '@shopify/app-bridge';
import { Button, ButtonGroup } from '@shopify/app-bridge/actions';
import type { AppBridgeTarget, ComplexAction, MenuGroupDescriptor } from '../types';
export declare function generateRedirect(appBridge: ClientApplication<{}>, url?: string, target?: AppBridgeTarget, external?: boolean): (() => void) | undefined;
export declare function transformActions(appBridge: ClientApplication<{}>, { primaryAction, secondaryActions, }: {
    primaryAction?: ComplexAction;
    secondaryActions?: ComplexAction[];
}): {
    primary?: Button.Button;
    secondary?: Button.Button[];
};
export declare function transformActions(appBridge: ClientApplication<{}>, { primaryAction, secondaryActions, actionGroups, }: {
    primaryAction?: ComplexAction;
    secondaryActions?: ComplexAction[];
    actionGroups?: MenuGroupDescriptor[];
}): {
    primary?: Button.Button;
    secondary?: (Button.Button | ButtonGroup.ButtonGroup)[];
};