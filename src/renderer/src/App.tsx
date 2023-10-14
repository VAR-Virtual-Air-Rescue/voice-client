import { useMainProcessCommunication } from './hooks/useMainProcessCommunication'

function App(): JSX.Element {
  useMainProcessCommunication()
  return <div>Test</div>
}

export default App
