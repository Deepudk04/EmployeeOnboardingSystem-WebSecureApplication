import { createContext, useReducer, useEffect,useContext } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { user: action.payload }
    case 'logout':
      return { user: null }  
    default:
      return state
  }
}
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'login', payload: user }) 
    }
  }, [])

  console.log('Auth state: ', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuthConsume = () => {
    const context = useContext(AuthContext)
  
    if(!context) {
      throw Error('useAuthContext must be used inside an AuthContextProvider')
    }
    return context
}