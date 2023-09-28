import { Button, Form, Input } from "antd";
import React from "react";

const SignUp = () => {
  return (
    <Form
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
        <Input />
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
        <Input.Password />
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
