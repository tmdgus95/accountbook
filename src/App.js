import { Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header />
            <Outlet />
            <BottomNav />
            <Footer />
        </>
    );
}

export default App;
