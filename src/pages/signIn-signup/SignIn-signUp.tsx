import React, { useState } from "react";
import { Input, Button, Checkbox, Form, FormProps } from "antd";
import { useNavigate } from "react-router-dom";
import agricultureImg from "../../assets/img/pexels-pixabay-325944.jpg";
import AnchorTag from "../../components/anchor-tag/AnchorTag.tsx";
import Image from "../../components/img/Image.tsx";
import { Heading1 } from "../../components/heading/Heading.tsx";

type FieldType = {
    username?: string;
    password?: string;
    email?: string;
    remember?: string;
};

const SignInSignUp: React.FC = () => {
    const navigate = useNavigate();
    const [isSignUp,    setIsSignUp] = useState(false); // Toggle between Sign In & Sign Up

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);
        navigate("/dashboard");
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side */}
            <div className="hidden lg:flex flex-[4] bg-green-100 justify-center items-center">
                <Image path={agricultureImg} altName={"Agriculture"} classes={"w-full h-full object-cover"} />
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-[2] justify-center items-center p-8 w-full max-w-2xl">
                <div className="w-full">
                    <Heading1 name={isSignUp ? "Create Your Account" : "Sign In"} classes={"text-center mb-8 font-bold text-2xl"} />
                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 20 }}
                        style={{ width: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        {/* Username Field */}
                        <Form.Item<FieldType>
                            label="Username"
                            name="username"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: "Please input your username!" }]}
                            style={{ marginBottom: "3px" }}
                        >
                            <Input />
                        </Form.Item>

                        {/* Email Field (Only for Sign Up) */}
                        {isSignUp && (
                            <Form.Item<FieldType>
                                label="Email"
                                name="email"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input your username!" }]}
                                style={{ marginBottom: "3px" }}
                            >
                                <Input />
                            </Form.Item>

                        )}

                        {/* Password Field */}
                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: "Please input your password!" }]}
                            style={{ marginBottom: "3px" }}
                        >
                            <Input.Password />
                        </Form.Item>

                        {/* Forgot Password (Only for Sign In) */}
                        {!isSignUp && (
                            <AnchorTag href="/forgot-password" name={"Forgot password?"} classes={"text-blue-500 mb-2 text-right hover:underline block"} />
                        )}

                        {/* Remember Me Checkbox (Only for Sign In) */}
                        {!isSignUp && (
                            <Form.Item<FieldType>
                                name="remember" valuePropName="checked"
                                className={"text-center"}
                                label={null}
                                wrapperCol={{ span: 24, offset: 0 }}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        )}

                        <Form.Item
                            label={null}
                            wrapperCol={{ span: 24, offset: 0 }}
                            className="flex justify-center"
                            style={{ marginTop: "24px" }}
                        >
                            <Button type="primary" className="bg-green-500 w-full max-w-sm px-20" htmlType="submit">
                                {isSignUp ? "Sign Up" : "Sign In"}
                            </Button>
                        </Form.Item>

                        {/* Toggle Between Sign In & Sign Up */}
                        <div className="text-center mt-4 pr-3 pl-3">
                            {isSignUp ? (
                                <p>
                                    Already have an account?{" "}
                                    <AnchorTag name={"Sign In"} href={"#"} classes={"text-blue-500 hover:underline"} onClick={() => setIsSignUp(false)} />
                                </p>
                            ) : (
                                <p>
                                    Don't have an account?{" "}
                                    <AnchorTag name={"Sign Up"} href={"#"} classes={"text-blue-500 hover:underline"} onClick={() => setIsSignUp(true)} />
                                </p>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignInSignUp;
