import Google from "./google.png";
import style from './Login.module.css'
import { fbLogin, login } from "../../redux/apiCalls.js"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import Swal from "sweetalert2";


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);


    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };

    const responseFacebook = (response) => {
        const { id,name, email, picture,accessToken } = response;
        const user = {id:id, userName: name, email: email, picture: picture.data.url, isAdmin: false,accessToken:accessToken }
        if (response.name === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Đăng nhập thất bại!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
        }
        fbLogin(dispatch, { user });
    };
    const responseGoogle = response => {
        const {RW,sf,yv,zN} = response.Iu
        const user = {id:RW, userName: sf, email: yv, picture: zN, isAdmin: false,}
        if (response.name === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Đăng nhập thất bại!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
        }
        fbLogin(dispatch, { user });
      };
    return (
        <div className={style.login}>
            <div className={style.wrapper}>
                <h1 className={style.loginTitle}>Choose a Login Method</h1>
                <div className={style.left}>
                <div className="flex-container" style={{ backgroundColor: '#FBF9FA', width: '23vw', display: 'flex', flexFlow: 'column', alignItems: 'center', borderRadius: '25px' }}>
                <FacebookLogin
                        appId="715910499567542"
                        buttonText=" Google"
                        cssClass={`${style.loginButton} ${style.facebook}`}
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile,email,user_friends"
                        callback={responseFacebook}
                        icon="fa-facebook"
                    /> 
                    <GoogleLogin
            clientId="814231246438-s6ctvkakj4v6v1edo7ramflahi506gtg.apps.googleusercontent.com"
            buttonText="Google"
            render={renderProps => (
                <button className={`${style.loginButton} ${style.google}`} onClick={renderProps.onClick} disabled={renderProps.disabled} >
            <img src={Google} alt="" className={style.icon} />
            Login With Google
          </button>
              )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
            </div>
                </div>
                <div className={style.center}>
                    <div className={style.line} />
                    <div className={style.or}>OR</div>
                </div>
                <div className={style.right}>
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password"
                        onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button className={style.submit} onClick={handleClick} disabled={isFetching}>Login</button>
                    {error && <span style={{ color: 'red' }}>Something went wrong...</span>}
                </div>
            </div>
        </div>
    );
};



export default Login;