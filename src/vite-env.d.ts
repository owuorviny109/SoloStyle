/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_MPESA_ENVIRONMENT?: string
  readonly VITE_MPESA_CONSUMER_KEY?: string
  readonly VITE_MPESA_CONSUMER_SECRET?: string
  readonly VITE_MPESA_SHORTCODE?: string
  readonly VITE_MPESA_PASSKEY?: string
  readonly VITE_MPESA_CALLBACK_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}