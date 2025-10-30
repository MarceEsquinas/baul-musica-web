import { LandingContent } from "../components/landingContent"
import { Footer } from "../components/Footer"
import { Header } from "../components/header"
import { Buton } from "../components/buton"

export const Landing = () => {
    return (
        <div className="flex flex-col h-screen w-full">
            <Header />
            <LandingContent />
            <LandingContent />
            <Footer />
            <Buton/>
        
        </div>
    )
}
