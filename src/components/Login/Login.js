import React, { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

// const emailReducer = (state, action) => {
//   if (action.type === "USER_INPUT") {
//     return { value: action.val, isValid: action.val.includes("@") };
//   }
//   if (action.type === "INPUT_BLUR") {
//     return { value: state.value, isValid: state.value.includes("@") };
//   }
//   return { value: "", isValid: false };
// };

// const passwordReducer = (state, action) => {
//   if (action.type === "USER_INPUT") {
//     return { value: action.val, isValid: action.val.trim().length > 6 };
//   }
//   if (action.type === "INPUT_BLUR") {
//     return { value: state.value, isValid: state.value.trim().length > 6 };
//   }
//   return { value: "", isValid: false };
// };

const loginFormReducer = (state, action) => {
  if (action.type === "EMAIL") {
    return {
      email: action.val,
      isEmailValid: action.val.includes("@"),
      password: state.password,
      isPasswordValid: state.isPasswordValid,
      isFormValid: action.val.includes("@") && state.isPasswordValid,
    };
  }
  if (action.type === "EMAIL_BLUR") {
    return {
      email: state.email,
      isEmailValid: state.email.includes("@"),
      password: state.password,
      isPasswordValid: state.isPasswordValid,
      isFormValid: state.email.includes("@") && state.isPasswordValid,
    };
  }

  if (action.type === "PASSWORD") {
    return {
      email: state.email,
      isEmailValid: state.isEmailValid,
      password: action.val,
      isPasswordValid: action.val.trim().length > 6,
      isFormValid: state.isEmailValid && action.val.trim().length > 6,
    };
  }
  if (action.type === "PASSWORD_BLUR") {
    return {
      email: state.email,
      isEmailValid: state.isEmailValid,
      password: state.password,
      isPasswordValid: state.password.trim().length > 6,
      isFormValid: state.isEmailValid && state.password.trim().length > 6,
    };
  }

  return {
    email: "",
    password: "",
    isEmailValid: null,
    isPasswordValid: null,
    isFormValid: false,
  };
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);
  // const [emailState, dispatchEmail] = useReducer(emailReducer, {
  //   value: "",
  //   isValid: null,
  // });
  // const [passwordState, dispatchPasword] = useReducer(passwordReducer, {
  //   value: "",
  //   isValid: null,
  // });
  const [loginFormState, dispatchLoginForm] = useReducer(loginFormReducer, {
    email: "",
    password: "",
    isEmailValid: null,
    isPasswordValid: null,
    isFormValid: false,
  });

  // const { isValid: emailIsValid } = emailState;
  // const { isValid: passwordIsValid } = passwordState;

  // useEffect(() => {
  //   const formValidityTimer = setTimeout(() => {
  //     setFormIsValid(emailIsValid && passwordIsValid);
  //   }, 500);

  //   return () => {
  //     clearTimeout(formValidityTimer);
  //   };
  // }, [emailIsValid, passwordIsValid]);

  // useEffect(() => {
  //   const formValidityTimer = setTimeout(() => {
  //     setFormIsValid(emailState.isValid && enteredPassword.trim().length > 6);
  //   }, 500);

  //   return () => {
  //     clearTimeout(formValidityTimer);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const authCtx = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    dispatchLoginForm({ type: "EMAIL", val: event.target.value });
    // dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setEnteredEmail(event.target.value);
    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchLoginForm({ type: "PASSWORD", val: event.target.value });
    // dispatchPasword({ type: "USER_INPUT", val: event.target.value });
    // setEnteredPassword(event.target.value);
    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchLoginForm({ type: "EMAIL_BLUR" });
    // dispatchEmail({ type: "INPUT_BLUR" });
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchLoginForm({ type: "PASSWORD_BLUR" });
    // dispatchPasword({ type: "INPUT_BLUR" });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.value, passwordState.value);
    authCtx.onLogin(loginFormState.email, loginFormState.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            loginFormState.isEmailValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={loginFormState.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            loginFormState.isPasswordValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={loginFormState.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!loginFormState.isFormValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
