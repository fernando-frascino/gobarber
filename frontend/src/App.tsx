import React from 'react';

import SingIn from './pages/SingIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SingIn />
      {/* <SignUp /> */}
    </AppProvider>

    <GlobalStyle />
  </>
)

export default App;
