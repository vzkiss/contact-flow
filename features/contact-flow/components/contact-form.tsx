import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Contact } from '@/db/schema'
import AvatarUpload from './avatar-upload'
import { CONTACT_FIELDS } from '@/configs/contact-fields'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ContactFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contact: Contact | null
}

function ContactForm({ open, onOpenChange, contact }: ContactFormProps) {
  const isEdit = contact != null
  const title = isEdit ? 'Edit contact' : 'New contact'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[min(364px,calc(100%-2rem))] border-none bg-(--color-g100) p-6 shadow-none sm:max-w-[364px]"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">{title}</DialogTitle>
        </DialogHeader>

        <form className="space-y-6">
          <AvatarUpload contact={contact} />

          {/* form fields */}
          <div className="flex flex-col space-y-4">
            {CONTACT_FIELDS.map((field) => (
              <div key={field.name} className="space-y-1">
                <Label
                  htmlFor={field.name}
                  className="text-xs text-text-secondary"
                >
                  {field.label}
                </Label>
                <Input
                  className="text-text-primary text-sm"
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={contact?.[field.name] ?? ''}
                />
              </div>
            ))}
          </div>
        </form>

        <DialogFooter className="gap-2 pt-6">
          <Button
            type="button"
            className="order-last md:order-first"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={() => onOpenChange(false)}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ContactForm
