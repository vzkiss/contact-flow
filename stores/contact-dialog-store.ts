import { create, useStore } from 'zustand'
import { Contact } from '@/db/schema'

type State = {
  open: boolean
  contact: Contact | null
}

type Actions = {
  openAdd: () => void
  openEdit: (contact: Contact) => void
  close: () => void
}

type ContactDialogStore = State & Actions

/**
 * contactDialogStore
 * @returns A store for the contact dialog
 */
export const contactDialogStore = create<ContactDialogStore>((set) => ({
  open: false,
  contact: null,
  openAdd: () => set({ open: true, contact: null }),
  openEdit: (contact) => set({ open: true, contact }),
  close: () => set({ open: false, contact: null }),
}))

export const useContactDialog = () => useStore(contactDialogStore)
