import { DEFAULT_AVATAR_URL } from '@/configs/defaults'

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ''}${parts.at(-1)![0] ?? ''}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export function isCustomAvatar(avatar: string | null | undefined): boolean {
  return Boolean(avatar && avatar !== DEFAULT_AVATAR_URL)
}
