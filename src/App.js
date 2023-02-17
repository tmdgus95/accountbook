import { useState } from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import ExpendModal from "./components/ExpendModal";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
    const [modal, setModal] = useState(false);

    return (
        <>
            <Header />
            <Outlet />
            <BottomNav setModal={setModal} />
            {modal && <ExpendModal setModal={setModal} />}
            <Footer />
        </>
    );
}

export default App;
