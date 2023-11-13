import { useMainProcessCommunication } from './hooks/useMainProcessCommunication'
import { useSocket } from './hooks/useSocket'
import { useMediasoup } from './hooks/useMediasoup'
import { useEffect } from 'react'
import { useAudioStream } from './hooks/useAudioStream'

function App(): JSX.Element {

  const {connectToChannel} = useMediasoup()
  const {connect, socketRef} = useSocket()
  const {getStream} = useAudioStream()

  useMainProcessCommunication()

  useEffect(() => {
    if(!socketRef.current) {
      console.log("connecting")
      const socket = connect("sfu", {channelid: "1"})
      
      socket.on('connect', async() =>  {
        console.log("socket connected")
        const stream = await getStream()
        connectToChannel(socket, stream)
      })

      socket.on('error-message', (message: string) => {
        console.log("Server error:", message)
      });
    }
  }, [connect])


  return <div>Test</div>
}

export default App