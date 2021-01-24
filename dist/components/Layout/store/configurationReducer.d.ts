/** @format */
export interface PayloadInterface {
    primaryColor: string;
    collapsed: boolean;
}
export interface ActionInterface {
    type: string;
    payload: PayloadInterface;
}
export declare function configurationReducer(state: PayloadInterface, action: ActionInterface): {
    primaryColor: string;
    collapsed: boolean;
};
