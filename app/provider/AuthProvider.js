import React,{useState,createContext} from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({ isAuth: false, payload:null })

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
