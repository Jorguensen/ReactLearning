import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Wrapper from "../Helpers/Wrapper";
import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim() === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age",
      });
      return;
    }

    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid age",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <Wrapper>
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Name</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age(Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
        {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            dismissError={errorHandler}
          />
        )}
      </Card>
    </Wrapper>
  );
};

export default AddUser;
