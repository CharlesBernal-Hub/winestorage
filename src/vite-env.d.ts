/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LEARNING_PLATFORM_API_URL: string;
    readonly VITE_CELLARS_ENDPOINT_PATH: string;
    readonly VITE_STORAGE_ITEMS_ENDPOINT_PATH: string;
    readonly VITE_WINERY_API_URL: string;
    readonly VITE_SIGNUP_ENDPOINT_PATH: string;
    readonly VITE_SIGNIN_ENDPOINT_PATH: string;
    readonly VITE_USERS_ENDPOINT_PATH: string;
    readonly VITE_PRIME_UI_LICENSE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}