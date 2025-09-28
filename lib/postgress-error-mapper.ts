// Type for postgres error from 'postgres' driver
interface PostgresErrorType {
    message?: string;
    code?: string;
    cause?: {
        name?: string;
        severity?: string;
        code?: string;
        where?: string;
        detail?: string;
    };
}

// Type guard to check if error is from postgres driver
export function isPostgresError(error: unknown): error is PostgresErrorType {
    return (
        error !== null &&
        typeof error === "object" &&
        // Direct postgres error
        ((error as any)?.code !== undefined ||
            // Error with cause (wrapped)
            (error as any)?.cause?.name === "PostgresError" ||
            // Error message contains postgres indicators
            (error as any)?.message?.includes?.("PostgresError"))
    );
}

export function mapPostgresError(error: PostgresErrorType): string {
    // Try to get error code from various places
    const errorCode = error?.code || error?.cause?.code;

    if (errorCode) {
        const errorMappings: Record<string, string> = {
            "23505": "This item already exists",
            "23503": "Cannot delete: item is being used elsewhere",
            "23502": "Required field is missing",
            "22P02": "Invalid data format provided",
            "42P01": "Resource not found",
            "42703": "Invalid field specified",
        };

        return errorMappings[errorCode] || "Database operation failed";
    }

    return "An unexpected error occurred";
}
