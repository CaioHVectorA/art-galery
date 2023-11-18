import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import { Initial, Feed } from './pages'
import './App.css'

function App() {

  return (
    <BrowserRouter>
    {/* <GoogleOAuthProvider clientId='690849227868-bfjbcprepqgu7od9ih3q59cjdvd8p7dl.apps.googleusercontent.com'> */}
      <Routes>
        <Route path="/" element={<Initial />} />
      </Routes>
      <Routes>
        <Route path="/feed" element={<Feed />} />
      </Routes>
    {/* </GoogleOAuthProvider> */}
  </BrowserRouter>
  )
}

export default App
