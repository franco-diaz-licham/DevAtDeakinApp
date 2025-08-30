import React from "react";
import SubscriberForm from "../../features/home/components/SubscriberForm";
import Footer from "./Footer";
import Navbar from "./Navbar";

/** Functional component props. */
interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
    return (
        <>
            <header className="sticky-top">
                <Navbar />
            </header>
            <main className="py-4 main-content">
                <div className="container-xxl">{props.children}</div>
            </main>
            <SubscriberForm />
            <Footer />
        </>
    );
};

export default MainLayout;
