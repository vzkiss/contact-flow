import { NewContact, UpdateContact } from '@/db/schema'
import { queryOptions, mutationOptions } from '@tanstack/react-query'

// query key factory
const queryKeys = {
  all: () => ['contacts'],
  lists: () => [...queryKeys.all(), 'list'],
}

/**
 * getContactsQueryOptions
 * @returns A query options object for the contacts query
 */
const getContactsQueryOptions = queryOptions({
  queryKey: queryKeys.lists(),
  queryFn: async () => {
    const r = await fetch('/api/contact')
    if (!r.ok) throw new Error(`Failed to fetch contacts: ${r.status}`)
    return r.json()
  },
})

/**
 * deleteContactMutationOptions
 * @returns A mutation options object for the delete contact mutation
 */
const deleteContactMutationOptions = mutationOptions({
  mutationFn: async (id: number) => {
    const r = await fetch(`/api/contact/${id}`, { method: 'DELETE' })
    if (!r.ok) throw new Error(`Failed to delete contact: ${r.status}`)
  },
})

/**
 * saveContactMutationOptions
 * @param contact - The contact to save
 * @returns A mutation options object for the save contact mutation
 */
const saveContactMutationOptions = mutationOptions({
  mutationFn: async (contact: NewContact | UpdateContact) => {
    const r = await fetch(`/api/contact/${contact.id ?? ''}`, {
      method: contact.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    })
    if (!r.ok) {
      const body = await r.json().catch(() => null)
      throw new Error(body?.error ?? `Failed to save contact`)
    }
    return r.json()
  },
})

export {
  queryKeys,
  getContactsQueryOptions,
  deleteContactMutationOptions,
  saveContactMutationOptions,
}
