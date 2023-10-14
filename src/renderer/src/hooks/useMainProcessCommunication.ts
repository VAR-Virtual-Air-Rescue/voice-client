import { useEffect } from 'react'

export const useMainProcessCommunication: () => void = () => {

  useEffect(() => {
    window.electronAPI.startMainProcessConnection()
  }, [])
}