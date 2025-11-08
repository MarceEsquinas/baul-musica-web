import { LandingContent } from "../components/landingContent"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import { LogoutButton } from "../components/logouthButton"

export const Playlist = () => {
    return (
        <div className="flex flex-col h-screen w-full">
            <Header /> <LogoutButton/>
            
            <LandingContent />
            
            <Footer />
            
        
        </div>
    )
}
