import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import { DarkThemeProvider } from "./providers/DarkThemeProvider";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import UserProvider from "./users/providers/UserProvider";
import Router from "./routes/Router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DarkThemeProvider>
          <SnackbarProvider>
            <UserProvider>
              <Layout>
                <Router />
              </Layout>
            </UserProvider>
          </SnackbarProvider>
        </DarkThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
