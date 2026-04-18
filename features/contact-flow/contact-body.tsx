'use client'

import ContactList from './components/contact-list'
import ContactForm from './components/contact-form'
import { useContactDialog } from '@/stores/contact-dialog-store'

/**
 * ContactBody
 * @returns A body component for the contact flow page
 */
function ContactBody() {
  const { open, close } = useContactDialog()

  return (
    <div className="border-t border-white/5 py-3">
      <h2 className="font-heading text-2xl">Subtitle</h2>
      <hr className="my-6 border-white/5" />
      <h3 className="font-body text-base">Headline 3</h3>
      <hr className="my-6 border-white/5" />

      <p className="text-sm">Body</p>
      <hr className="my-6 border-white/5" />
      <p className="text-xs">Message</p>
      <ContactList />
      <ContactForm
        open={open}
        onOpenChange={(next) => {
          if (!next) close()
        }}
      />
    </div>
  )
}

export default ContactBody
