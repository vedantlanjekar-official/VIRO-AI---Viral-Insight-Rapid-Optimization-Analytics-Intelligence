import Header from "./ui/Header";
import Router from "./components/Router";
import Footer from "./ui/Footer";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className="site">
        <Header />
        <Router />
        <Footer />
      </div>
    </AuthProvider>
  );
}
