import { useMainProcessCommunication } from './hooks/useMainProcessCommunication'
import { useSocket } from './hooks/useSocket'
import { useMediasoup } from './hooks/useMediasoup'
import { useEffect } from 'react'
import { useAudioStream } from './hooks/useAudioStream'
// import { ipcRenderer, IpcRendererEvent } from 'electron'

function App(): JSX.Element {

  const {connectToChannel, connectReceiveTransport} = useMediasoup()
  const {connect, socketRef} = useSocket()
  const {getStream} = useAudioStream()

  // useEffect(() => {
  //   ipcRenderer.on('ping', (event: IpcRendererEvent, arg: any) => {
  //     console.log(arg)
  //   })
  // }, [ipcRenderer])

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

      socket.on('new-producer', ({producerId}) => {
        console.log("new producer", producerId)
        connectReceiveTransport(socket, producerId)
      });

      socket.on('error-message', (message: string) => {
        console.log("Server error:", message)
      });
    }
  }, [connect])



  return <div>Test</div>
}

export default App