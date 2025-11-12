/*
 * (#)MovieApiResponse.tsx  0.3.0   11/12/2025
 *
 * @author  Jonathan Parker
 * @version 0.3.0
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
 * Represents the date range for the movie results.
 */
interface DateRange {
    maximum: string; // e.g., "2025-11-12"
    minimum: string; // e.g., "2025-10-01"
}

/**
 * Represents a single movie object.
 */
export interface MovieResult {
    adult: boolean;
    backdrop_path: string | null; // Can be a string path or null
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null; // Can be a string path or null
    release_date: string; // e.g., "2025-10-17"
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

/**
 * Represents the full response structure for the movie list API.
 */
export interface MovieApiResponse {
    dates: DateRange;
    page: number;
    results: MovieResult[];
    total_pages: number;
    total_results: number;
}
