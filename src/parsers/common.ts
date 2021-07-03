export interface ITypeGuard<T> {
    (value: unknown): value is T;
}

export function isString(candidate: unknown): candidate is string {
    return typeof candidate === 'string';
}

export function isNumber(candidate: unknown): candidate is number {
    return typeof candidate === 'number';
}

export function isBoolean(candidate: unknown): candidate is boolean {
    return typeof candidate === 'boolean';
}

export function isArray(candidate: unknown): candidate is unknown[] {
    return Array.isArray(candidate);
}

export function isNotUndefined<T>(candidate: T | undefined): candidate is T {
    return candidate !== undefined;
}

export function isNotNullOrUndefined<T>(candidate: T | undefined | null): candidate is T {
    return candidate !== undefined && candidate !== null;
}

export function isEnumMember<E>(enumToTest: E): ITypeGuard<E[keyof E]> {
    return (candidate: unknown): candidate is E[keyof E] => {
        const members = Object.values(enumToTest);

        return members.includes(candidate);
    };
}

export interface IParser<T> {
    <F>(value: unknown, fallbackValue: F, property?: string, logError?: boolean): T | F;
}

export function safelyParseOr<T, F>(data: unknown, property: string, parse: IParser<T>, fallback: F, logErrorOnUndefined: boolean = true): T | F {
    const [first, ...chainedProperties] = property.split('.');
    if (typeof data === 'object' && data !== null && data.hasOwnProperty(first)) {
        // @ts-ignore
        const value = data[first];

        // this if statement allows for chaining property parsing via dot notation. (i.e. 'firstProp.chainedProp.anotherChainedProp')
        if (chainedProperties.length) {
            return safelyParseOr(value, chainedProperties.join('.'), parse, fallback, logErrorOnUndefined);
        }

        return parse(value, fallback, property, logErrorOnUndefined);
    }
        if (logErrorOnUndefined && !(typeof data === 'object' && data !== null)) {
            const error = new Error(`Parser: Cannot access ${property} of ${data}. Returning ${fallback}`);
            // eslint-disable-next-line no-console
            console.log(error);
            // eslint-disable-next-line no-console
            console.log(data);
        }

        return fallback;
}

export function parseAsType<T>(isExpectedType: ITypeGuard<T>): IParser<T> {
    return (value, fallback, property, logError = true) => {
        if (isExpectedType(value)) {
            return value;
        }
            // This prevents the errors: `PreviewStream: null is not of expected type. Returning `, when the parser expects a string, but the
            // fallback is null, meaning it's actually nullable.
            const hasError = logError && value && fallback;

            if (hasError) {
                const error = new Error(`Parser: ${property || 'unknown'}: ${value} is not of expected type. Returning ${fallback}`);

                // eslint-disable-next-line no-console
                console.log(error.message, error);
            }

            return fallback;
        
    };
}

export const parseAsString = parseAsType(isString);
export const parseAsNumber = parseAsType(isNumber);
export const parseAsBoolean = parseAsType(isBoolean);
export const parseAsArray = parseAsType(isArray);
