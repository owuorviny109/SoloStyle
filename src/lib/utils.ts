import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(amount / 100) // Convert from cents to KES
}

export function formatPhoneNumber(phone: string): string {
  // Convert to 254XXXXXXXXX format for M-Pesa
  const cleaned = phone.replace(/[\s\-\(\)+]/g, '')
  
  if (cleaned.startsWith('254')) {
    return cleaned
  } else if (cleaned.startsWith('0')) {
    return `254${cleaned.slice(1)}`
  } else if (cleaned.length === 9) {
    return `254${cleaned}`
  }
  
  return cleaned
}

export function validatePhoneNumber(phone: string): boolean {
  const formatted = formatPhoneNumber(phone)
  // Allow all Kenyan networks, not just Safaricom (254[17])
  const kenyanPhoneRegex = /^254[0-9]\d{8}$/
  return kenyanPhoneRegex.test(formatted)
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `ORD-${timestamp}-${random}`.toUpperCase()
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}