import { Header } from "../components/header";
import { CreateListForm } from "../components/createListForm";

export const Playlist = () => {
    return (
        <div className="flex flex-col h-screen w-full">
            <Header /> 
            <CreateListForm/>
        
        </div>
    )
}