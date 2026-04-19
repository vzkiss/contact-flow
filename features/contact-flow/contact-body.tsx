'use client'

import ContactList from './components/contact-list'
import ContactForm from './components/contact-form'
import { useContactDialog } from '@/stores/contact-dialog-store'
import { useQuery } from '@tanstack/react-query'

/**
 * ContactBody
 * @returns A body component for the contact flow page
 */
function ContactBody() {
  const { open, close, contact } = useContactDialog()

  return (
    <div className="border-t border-white/5 py-3">
      <ContactList />
      <ContactForm
        key={contact?.id ?? 'new'}
        contact={contact}
        open={open}
        onOpenChange={(next) => {
          if (!next) close()
        }}
      />
    </div>
  )
}

export default ContactBody
