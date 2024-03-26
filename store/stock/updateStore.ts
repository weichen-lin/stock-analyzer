import { create } from 'zustand'
import { useField } from 'formik'

interface IUseUpdate {
  startUpdate: boolean
  setStartUpdate: (startUpdate: boolean) => void
}

const updateStore = create<IUseUpdate>((set) => ({
  startUpdate: false,
  setStartUpdate: (startUpdate: boolean) => set({ startUpdate }),
}))

export default updateStore
