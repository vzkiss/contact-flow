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
import { CONTACT_FIELDS, FieldConfig } from '@/configs/contact-fields'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Field, FieldError } from '@/components/ui/field'
import { FormValidateOrFn, useForm } from '@tanstack/react-form'
import { contactSchema } from '@/lib/validations'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  queryKeys,
  saveContactMutationOptions,
} from '@/features/contact-flow/query'
import { toast } from 'sonner'

interface ContactFormProps {
  contact: Contact | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// intersection type
type ContactFormValues = Record<FieldConfig['name'], string> & {
  avatar: string
}

// build the empty form values from the contact fields
// prettier-ignore
const emptyFormValues: ContactFormValues = {
  ...(Object.fromEntries(CONTACT_FIELDS.map((f) => [f.name, ''])) as Record<FieldConfig['name'],string>),
  avatar: '',
}

function defaultValuesFromContact(contact: Contact | null): ContactFormValues {
  if (!contact) return emptyFormValues
  return {
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    avatar: contact.avatar ?? '',
  }
}

/**
 * ContactForm
 * @param open - Whether the dialog is open
 * @param onOpenChange - A function to call when the dialog is opened or closed
 * @param contact - The contact to edit, or null for a new contact
 * @returns A form component for the contact flow page
 */
function ContactForm({ open, onOpenChange, contact }: ContactFormProps) {
  const title = contact !== null ? 'Edit contact' : 'New contact'

  const form = useForm({
    defaultValues: defaultValuesFromContact(contact),
    onSubmit: async ({ value }) => {
      saveContactMutation.mutate(contact ? { ...value, id: contact.id } : value)
    },
    validators: {
      onChange: contactSchema as FormValidateOrFn<ContactFormValues>,
      onSubmit: contactSchema as FormValidateOrFn<ContactFormValues>,
    },
  })

  const queryClient = useQueryClient()

  const saveContactMutation = useMutation({
    ...saveContactMutationOptions,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.all() }),
    onError: (error) => {
      toast.error(error.message || 'Failed to save contact')
    },
    onSuccess: () => {
      toast.success('Contact saved')
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[min(364px,calc(100%-2rem))] border-none bg-(--color-g100) p-6 shadow-none sm:max-w-[364px]"
        showCloseButton={false}
      >
        <form
          id="contact-form"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="grid w-full min-w-0 gap-6"
        >
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">{title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <form.Subscribe selector={(state) => state.values.name}>
              {(name) => (
                <form.Field name="avatar">
                  {(field) => (
                    <AvatarUpload
                      value={field.state.value}
                      onChange={(v) => field.handleChange(v)}
                      nameForInitials={name}
                    />
                  )}
                </form.Field>
              )}
            </form.Subscribe>

            {/* form fields */}
            <div className="flex flex-col space-y-4">
              {CONTACT_FIELDS.map((fieldConfig) => (
                <form.Field key={fieldConfig.name} name={fieldConfig.name}>
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field
                        key={fieldConfig.name}
                        data-invalid={isInvalid}
                        className="space-y-1"
                      >
                        <Label
                          htmlFor={fieldConfig.name}
                          className="text-xs text-text-secondary"
                          data-invalid={isInvalid}
                        >
                          {fieldConfig.label}
                        </Label>
                        <Input
                          className="text-text-primary text-sm"
                          id={fieldConfig.name}
                          name={fieldConfig.name}
                          type={fieldConfig.type}
                          value={field.state.value}
                          placeholder={fieldConfig.placeholder}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field>
              ))}
            </div>
          </div>

          <DialogFooter className="gap-2 pt-6">
            <Button
              type="button"
              className="order-last sm:order-first"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Done
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ContactForm
