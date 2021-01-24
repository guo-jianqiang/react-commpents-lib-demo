/** @format */
import React from 'react';
import { ActionInterface, PayloadInterface } from './configurationReducer';
export interface ConfigurationContextInterface {
    state: PayloadInterface;
    dispatch: (action: ActionInterface) => void;
}
export declare const getSystemConfig: () => any;
declare const ConfigurationContext: React.Context<ConfigurationContextInterface>;
export default ConfigurationContext;
