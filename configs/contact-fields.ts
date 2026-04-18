export type FieldConfig = {
  name: 'name' | 'phone' | 'email'
  label: string
  placeholder: string
  type: string
  required: boolean
}

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
    required: false,
  },
  {
    name: 'email',
    label: 'Email address',
    placeholder: 'jamie.wright@mail.com',
    type: 'email',
    required: false,
  },
]
