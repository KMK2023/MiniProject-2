import { useContext, useState } from "react";
// import { useUserContext } from "../context/UserContext";
// import { MyThemeContext } from "../context/MyThemeContext";

function LoginForm() {



const serverUrl = 'localhost:8080/api/users/';

const [userEmail, setUserEmail] = useState('');
const [userPassword, setUserPassword] = useState('');
const [submitResult, setSubmitResult] = useState('');
const [data,setData] = useState([{userEmail: "test@gmail.com", password: "testing"}])
//const {currentUser, handleUpdateUser} = useUserContext();
// const {currentUser, handleUpdateUser} = useContext(UserContext);
//const {theme, darkMode} = useContext(MyThemeContext);

// useEffect(() => {
//   // Fetch data from the server when the component mounts
//   fetch(serverUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       setdata(data); 
//     })
//     .catch((error) => console.error('Error fetching data:', error));
// }, []); 



    const handleSubmit = (e) => {
         e.preventDefault(); // prevent page reloading on form submit
        console.log("submit button clicked")
        // add some password validation
        if (userPassword.length < 5) {  //if user password is less than 5
            setSubmitResult('Password must be at least 5 characters long');
        } else if (userPassword === userEmail) {
            setSubmitResult('Password must not match email address');
        } else {
            let validUser = data.find((item)=>(item.userEmail === userEmail && item.password === userPassword))
            if(validUser){
                setSubmitResult('Successful login.');
            }else{
                setSubmitResult("User does not match");
            }
            
            handleUpdateUser({ email: userEmail });
        }
    }

    {/* if the user is already logged in, show msg instead of form */}
    // if (currentUser.email) return (
    //     <><p>Welcome {currentUser.email}!</p>
    //     <button onClick={() => handleUpdateUser({})}>Log Out</button>
    //     </>
    // );

    return (
        
        <div className="LoginForm componentBox" style={{ backgroundColor: '#a09f9f', color: 'black', border: 'solid', padding:' 30px' }}> 
            //form tag
            <form onSubmit={handleSubmit}>
                <div className="formRow">
                    <label>Email Address:
                        <input type="email" value={userEmail} name="userEmail"   
                            onChange={(e) => setUserEmail(e.target.value)} />
                    </label>
                </div>
                <div className="formRow">
                    <label>Password:
                        <input type="password" value={userPassword} name="password"
                            onChange={(e) => setUserPassword(e.target.value)} />
                    </label>
                    <p style={{color: 'red'}}>{submitResult}</p>
                </div>
                <button>Log In</button>
               
            </form>
        </div>

    )
}

export default LoginForm