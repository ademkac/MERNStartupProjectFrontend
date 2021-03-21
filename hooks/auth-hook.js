import {useState, useCallback, useEffect} from 'react';
let logoutTimer;
export const useAuth = () => {
    const [token, setToken]= useState(false);
    const [tokenExpDate, setTokenExpDate]= useState();
    const [userId, setUserId] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState(); 
  
    
  
    const login = useCallback(( uid, name, email,  token, expDate)=>{
      setName(name);
      setEmail(email);
      setToken(token);
      setUserId(uid);
      const tokenExpDate = expDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpDate(tokenExpDate)
      localStorage.setItem(
        'userData',
         JSON.stringify({userId: uid, name: name, email: email, token: token, expiration: tokenExpDate.toISOString()})
         )
    }, []);
  
    const logout = useCallback(()=> {
      setToken(null);
      setTokenExpDate(null);
      setUserId(null);
      setName(null);
      setEmail(null);
      localStorage.removeItem('userData');
    }, []);
  
    useEffect(()=>{
      if(token && tokenExpDate){
        const remainingTime = tokenExpDate.getTime() - new Date().getTime()
       logoutTimer = setTimeout(logout, remainingTime)
      } else{
        clearTimeout(logoutTimer);
      }
    }, [token, logout, tokenExpDate])
  
    useEffect(()=>{
      const storedData= JSON.parse(localStorage.getItem('userData'));
     if(storedData && storedData.token && new Date( storedData.expiration) > new Date()){
       login(storedData.userId, storedData.name, storedData.email, storedData.token, new Date( storedData.expiration))
     }
     }, [login]);

     return {token, login, logout, userId, name, email}
}