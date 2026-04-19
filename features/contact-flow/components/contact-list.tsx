import { motion } from 'motion/react'
import { Contact } from '@/db/schema'
import ContactItem from './contact-item'
import { useQuery } from '@tanstack/react-query'
import { getContactsQueryOptions } from '@/features/contact-flow/query'

const now = new Date()

const MOCK_CONTACTS: Contact[] = [
  {
    id: 1,
    name: 'Timothy Lewis',
    email: 'timothy.lewis@example.com',
    phone: '+36 20 100 0001',
    avatar: '/assets/Timothy.png',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    name: 'Sarah Wright',
    email: 'sarah.wright@example.com',
    phone: '+36 20 100 0002',
    avatar: '/assets/Sarah.png',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    name: 'Lucy Jones',
    email: 'lucy.jones@example.com',
    phone: '+36 20 100 0003',
    avatar: '/assets/Lucy.png',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 4,
    name: 'Jake Perez',
    email: 'jake.perez@example.com',
    phone: '+36 20 100 0004',
    avatar: '/assets/Jake.png',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 5,
    name: 'Adebayo Rodriguez',
    email: 'adebayo.rodriguez@example.com',
    phone: '+36 20 100 0005',
    avatar: '/assets/Adebayo.png',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 6,
    name: 'Jamie Wright',
    email: 'jamie.wright@example.com',
    phone: '+36 20 100 0006',
    avatar: null,
    createdAt: now,
    updatedAt: now,
  },
]

/**
 * ContactList
 * @returns A list of contacts
 */
function ContactList() {
  const { data: contacts = [], isLoading } = useQuery(getContactsQueryOptions)

  // debug
  console.log(contacts)

  if (isLoading) {
    return <div>Loading...</div>
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
