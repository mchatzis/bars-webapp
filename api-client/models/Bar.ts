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
import type { FeatureTypeEnum } from './FeatureTypeEnum';
import {
    FeatureTypeEnumFromJSON,
    FeatureTypeEnumFromJSONTyped,
    FeatureTypeEnumToJSON,
} from './FeatureTypeEnum';

/**
 * 
 * @export
 * @interface Bar
 */
export interface Bar {
    /**
     * 
     * @type {number}
     * @memberof Bar
     */
    readonly id: number;
    /**
     * 
     * @type {FeatureTypeEnum}
     * @memberof Bar
     */
    featureType?: FeatureTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof Bar
     */
    longitude: string;
    /**
     * 
     * @type {string}
     * @memberof Bar
     */
    latitude: string;
    /**
     * 
     * @type {string}
     * @memberof Bar
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Bar
     */
    description?: string;
    /**
     * 
     * @type {Date}
     * @memberof Bar
     */
    readonly dateCreated: Date;
    /**
     * 
     * @type {Date}
     * @memberof Bar
     */
    readonly lastModified: Date;
    /**
     * 
     * @type {string}
     * @memberof Bar
     */
    tinyThumbnail?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Bar
     */
    thumbnail?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Bar
     */
    image1?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Bar
     */
    image2?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Bar
     */
    image3?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Bar
     */
    image4?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Bar
     */
    image5?: string | null;
    /**
     * 
     * @type {Array<number>}
     * @memberof Bar
     */
    barType: Array<number>;
}

/**
 * Check if a given object implements the Bar interface.
 */
export function instanceOfBar(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "longitude" in value;
    isInstance = isInstance && "latitude" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "dateCreated" in value;
    isInstance = isInstance && "lastModified" in value;
    isInstance = isInstance && "barType" in value;

    return isInstance;
}

export function BarFromJSON(json: any): Bar {
    return BarFromJSONTyped(json, false);
}

export function BarFromJSONTyped(json: any, ignoreDiscriminator: boolean): Bar {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'featureType': !exists(json, 'feature_type') ? undefined : FeatureTypeEnumFromJSON(json['feature_type']),
        'longitude': json['longitude'],
        'latitude': json['latitude'],
        'title': json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'dateCreated': (new Date(json['date_created'])),
        'lastModified': (new Date(json['last_modified'])),
        'tinyThumbnail': !exists(json, 'tiny_thumbnail') ? undefined : json['tiny_thumbnail'],
        'thumbnail': !exists(json, 'thumbnail') ? undefined : json['thumbnail'],
        'image1': !exists(json, 'image1') ? undefined : json['image1'],
        'image2': !exists(json, 'image2') ? undefined : json['image2'],
        'image3': !exists(json, 'image3') ? undefined : json['image3'],
        'image4': !exists(json, 'image4') ? undefined : json['image4'],
        'image5': !exists(json, 'image5') ? undefined : json['image5'],
        'barType': json['bar_type'],
    };
}

export function BarToJSON(value?: Bar | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'feature_type': FeatureTypeEnumToJSON(value.featureType),
        'longitude': value.longitude,
        'latitude': value.latitude,
        'title': value.title,
        'description': value.description,
        'tiny_thumbnail': value.tinyThumbnail,
        'thumbnail': value.thumbnail,
        'image1': value.image1,
        'image2': value.image2,
        'image3': value.image3,
        'image4': value.image4,
        'image5': value.image5,
        'bar_type': value.barType,
    };
}

