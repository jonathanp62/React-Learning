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
interface MovieResult {
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
interface MovieApiResponse {
    dates: DateRange;
    page: number;
    results: MovieResult[];
    total_pages: number;
    total_results: number;
}
