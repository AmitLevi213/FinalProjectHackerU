import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import { DarkThemeProvider } from "./providers/DarkThemeProvider";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import UserProvider from "./users/providers/UserProvider";
import Router from "./routes/Router";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <DarkThemeProvider>
          <SnackbarProvider>
            <UserProvider>
              <Layout>
                <Router />
              </Layout>
            </UserProvider>
          </SnackbarProvider>
        </DarkThemeProvider>
          </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
