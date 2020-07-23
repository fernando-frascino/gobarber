import React from 'react';

import SingIn from './pages/SingIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';
import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SingIn />
      {/* <SignUp /> */}
    </AuthProvider>
    <GlobalStyle />
  </>
)

export default App;
