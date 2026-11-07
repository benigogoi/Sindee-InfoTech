import { createContext, useContext } from 'react'

export type DeviceMode = 'desktop' | 'mobile'

export const DeviceModeContext = createContext<DeviceMode>('desktop')

export const useDeviceMode = (): DeviceMode => useContext(DeviceModeContext)
