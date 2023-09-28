import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import authService from "../services/auth.service";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    authService.register(username, email, password).then((response) => {
      setMessage(response.data.message);
      setSuccessful(true);
    }),
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setSuccessful(false);
        setMessage(resMessage);
      };
  };

  return (
    <Form
      onFinish={(e) => handleSignup(e)}
      className="form"
      labelCol={{
        span: 8,
      }}
    >
      <h1>Sign up</h1>
      <Form.Item
        label="Username"
        name="username"
        className="form-item"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        className="form-item"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
          {
            type: "email",
            message: "Please enter a valid email address!",
          },
        ]}
      >
        <Input onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        className="form-item"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>

      <Form.Item className="form-item button-item">
        <Button className="button" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
