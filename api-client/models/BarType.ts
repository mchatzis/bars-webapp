/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface BarType
 */
export interface BarType {
    /**
     * 
     * @type {number}
     * @memberof BarType
     */
    readonly id: number;
    /**
     * 
     * @type {string}
     * @memberof BarType
     */
    type: string;
}

/**
 * Check if a given object implements the BarType interface.
 */
export function instanceOfBarType(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "type" in value;

    return isInstance;
}

export function BarTypeFromJSON(json: any): BarType {
    return BarTypeFromJSONTyped(json, false);
}

export function BarTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): BarType {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'type': json['type'],
    };
}

export function BarTypeToJSON(value?: BarType | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
    };
}

