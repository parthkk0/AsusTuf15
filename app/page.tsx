import Navbar from "./components/Navbar";
import LaptopScroll from "./components/LaptopScroll";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#050505]">
            <Navbar />
            <LaptopScroll />
            <FeaturesSection />
            <Footer />
        </main>
    );
}
