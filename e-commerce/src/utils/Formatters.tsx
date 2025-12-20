/*
 * (#)Formatters.tsx    0.4.0   12/18/2025
 * (#)Formatters.tsx    0.3.0   11/27/2025
 *
 * @author  Jonathan Parker
 * @version 0.4.0
 * @since   0.3.0
 *
 * MIT License
 *
 * Copyright (c) 2025 Jonathan M. Parker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Formats a number as USD currency ($nn.nn).
 *
 * @param   {number}    amount  The number to format
 * @returns {string}            The formatted currency string
 */
export const formatPrice: (amount: number) => string = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

/**
 * Formats a rating as a string (nn.n).
 *
 * @param   {number}    rating  The rating to format
 * @returns {string}            The formatted rating string
 */
export const formatRating: (rating: number) => string = (rating: number): string => {
    return rating.toFixed(1);
};

/**
 * Capitalize a string.
 *
 * @param   {string}    str
 * @return  {string}
 */
export const capitalizeString: (str: string) =>  string = (str: string) : string => {
    if (str.length === 0) {
        return '';          // Handle empty or non-string inputs
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format the ISO-8601 date string.
 *
 * @param   {string}    date    The ISO-8601 date string
 * @returns {string}            The formatted date string
 */
export const formatIso8601Date: (date: string) => string = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    return new Date(date).toLocaleString('en-US', options);
}

/**
 * Formats a phone number as a string (nnn-nnn-nnnn).
 *
 * @param   {string}    phone   The phone number to format
 * @returns {string}            The formatted phone number string
 */
export const formatPhone: (phone: string) => string = (phone: string): string => {
    const pattern: RegExp = /^\d{3}-\d{3}-\d{4}$/;

    if (pattern.test(phone)) {
        return phone;
    } else {
        const justDigits: string = phone.replaceAll(/\D/g, '');

        return justDigits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
}
