import { IHourAnalytics, INewLanguagesAnalytics } from 'entities/analytics';
import { ISpreadsheetColumn } from './SpreadSheetColumns';

type Status = 'Success' | 'Failed';

const Auth = {
    storeAuthToken: (authToken: string): void => {
        localStorage.setItem('authToken', authToken);
    },
    getAuthToken: (): string | null => {
        return localStorage.getItem('authToken');
    },
    clearAuthToken: (): void => {
        localStorage.removeItem('authToken');
    },
};

const LocalStorage = {
    getItem<T>(key: string): T | null {
        const storageItem = localStorage.getItem(key);

        if (!storageItem) return null;

        return JSON.parse(storageItem);
    },
    setItem: (key: string, item: any | null): Status => {
        if (!item) return 'Failed';
        const parse = JSON.stringify(item);

        localStorage.setItem(key, parse);
        return 'Success';
    },
    removeItem: (key: string): void => {
        localStorage.removeItem(key);
    },
};

const Analytics = {
    calcLangPercentage(lang: string, total: string): string {
        return `(${Math.round((Number(lang) / Number(total)) * 100)}%)`;
    },

    prepareDynamicHeaders(data: INewLanguagesAnalytics[] | IHourAnalytics[]): string[] {
        if (!data.length) return [];

        const headers = Object.keys(data[0]).map(item => item[0].toUpperCase() + item.slice(1)); // make sure first letter of header is upper case

        return headers;
    },

    prepareLanguageData(data: INewLanguagesAnalytics[]): INewLanguagesAnalytics[] {
        if (!data.length) return [];

        let maxNumberOfKeys = {
            numberOfKeys: 0,
            keys: [''],
        };

        data.forEach((item, index) => {
            const allKeys = Object.keys(item);
            if (allKeys.length > maxNumberOfKeys.numberOfKeys) {
                maxNumberOfKeys = {
                    numberOfKeys: allKeys.length,
                    keys: allKeys,
                };
            }
        });

        const newData = data.map((item) => {
            let res = {
                date: item.data,
            };

            maxNumberOfKeys.keys.forEach((langKey) => {
                res = {
                    ...res,
                    [langKey]: item[langKey] || 0,
                };
            });

            return res;
        });

        return newData as INewLanguagesAnalytics[];
    },

    prepareDynamicDownloadHeaders(data: INewLanguagesAnalytics[] | IHourAnalytics[]): ISpreadsheetColumn[] {
        if (!data.length) return [];

        const headers = Object.keys(data[0]);

        const downloadHeaders = headers.map(item => {
            return {
                label: item[0].toUpperCase() + item.slice(1), // make sure first letter of sheet header is upper case
                value: item,
            };
        });

        return downloadHeaders;
    },
};

export default {
    Auth,
    LocalStorage,
    Analytics,
};
