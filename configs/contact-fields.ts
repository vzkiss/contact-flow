export type FieldConfig = {
  name: 'name' | 'phone' | 'email'
  label: string
  placeholder: string
  type: string
  required: boolean
}

/**
 * in production this would usually be stored in:
 * - a JSON file
 * - a Named Value Storage
 * - or an Edge Config Store (vercel)
 */
export const CONTACT_FIELDS: FieldConfig[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Jamie Wright',
    type: 'text',
    required: true,
  },
  {
    name: 'phone',
    label: 'Phone number',
    placeholder: '+01 234 5678',
    type: 'tel',
    required: true,
  },
  {
    name: 'email',
    label: 'Email address',
    placeholder: 'jamie.wright@mail.com',
    type: 'email',
    required: false,
  },
]
