import { createContext, useContext } from "react"

export const UserContext = createContext();

export const useUser = () => {
    const {user, loader} = useContext(UserContext);

    const {about} = user;
    return {user};
}
