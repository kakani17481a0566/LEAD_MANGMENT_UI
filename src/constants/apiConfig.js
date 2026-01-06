
// Base URL for API
// export const API_BASE_URL = "https://localhost:7257/api";
export const API_BASE_URL = "https://lead-mgmt-msi-kakani-2025.azurewebsites.net/api";

// API Endpoints
export const LEAD_ENDPOINTS = {
    LEAD_STATS: `${API_BASE_URL}/LeadSummary/LeadStats`,
    LEAD_COUNT_BY_BRANCH: `${API_BASE_URL}/LeadSummary/LeadCountByBranch-SuccessPercentage`,
    LEAD_COUNT_BY_SOURCE: `${API_BASE_URL}/LeadSummary/lead-count-by-source-current-year`,
    LEAD: `${API_BASE_URL}/Lead`,
};

export const USER_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/User/login`,
};
