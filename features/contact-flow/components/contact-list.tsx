import { motion } from 'motion/react'
import { Contact } from '@/db/schema'
import ContactItem from './contact-item'
import { useQuery } from '@tanstack/react-query'
import { getContactsQueryOptions } from '@/features/contact-flow/query'

import { Skeleton } from '@/components/ui/skeleton'

export function ContactItemSkeleton() {
  return (
    <div className="my-2.5 flex h-10 items-center space-x-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex flex-col justify-center gap-1.5">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

/**
 * ContactList
 * @returns A list of contacts
 */
function ContactList() {
  const { data: contacts = [], isLoading } = useQuery(getContactsQueryOptions)

  if (isLoading) {
    return (
      <div className="flex flex-col" aria-busy aria-label="Loading contacts">
        <ContactItemSkeleton />
        <ContactItemSkeleton />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {contacts.map((contact: Contact) => (
        <motion.div
          key={contact.id}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -20 }}
          layout
          transition={{ duration: 0.2 }}
        >
          <ContactItem key={contact.id} contact={contact} />
        </motion.div>
      ))}
    </div>
  )
}

export default ContactList
