import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import authService from "../services/auth.service";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    authService.login(username, password).then(() => {
      props.router.navigate("/profile");
      window.location.reload();
    }),
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      };
  };

  return (
    <Form
      onFinish={(e) => handleLogin(e)}
      className="form"
      labelCol={{
        span: 8,
      }}
    >
      <h1>Login</h1>
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

export default Login;
