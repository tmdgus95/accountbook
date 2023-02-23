import { useState } from "react";

import { Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainModal from "./components/MainModal";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
    const [modal, setModal] = useState(false);

    return (
        <AuthContextProvider>
            <Header />
            <Outlet />
            <BottomNav setModal={setModal} />
            {modal && <MainModal setModal={setModal} />}
            <Footer />
        </AuthContextProvider>
    );
}

export default App;
