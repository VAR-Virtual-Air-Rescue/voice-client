import { useEffect } from 'react'

export const useMainProcessCommunication: () => void = () => {
  useEffect( () => {

    async function startIPC() {
      const result = await window.electronAPI.startMainProcessConnection()
      console.log(result)
    }
    
    startIPC()

  }, [])
}