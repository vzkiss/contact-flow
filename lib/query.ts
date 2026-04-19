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
  queryFn: () => fetch('/api/contact').then((r) => r.json()),
})

/**
 * deleteContactMutationOptions
 * @returns A mutation options object for the delete contact mutation
 */
const deleteContactMutationOptions = mutationOptions({
  mutationFn: (id: number) => fetch(`/api/contact/${id}`, { method: 'DELETE' }),
})

/**
 * saveContactMutationOptions
 * @param contact - The contact to save
 * @returns A mutation options object for the save contact mutation
 */
const saveContactMutationOptions = mutationOptions({
  mutationFn: (contact: NewContact | UpdateContact) =>
    fetch(`/api/contact/${contact.id ?? ''}`, {
      method: contact.id ? 'PUT' : 'POST',
      body: JSON.stringify(contact),
    }),
})

export {
  queryKeys,
  getContactsQueryOptions,
  deleteContactMutationOptions,
  saveContactMutationOptions,
}
