import React from "react";
import { Input, Button, Checkbox, Form, FormProps } from "antd";
import { useNavigate } from "react-router-dom";
import agricultureImg from "../../assets/img/pexels-pixabay-325944.jpg";
import AnchorTag from "../../components/anchor-tag/AnchorTag.tsx";
import Image from "../../components/img/Image.tsx";
import {Heading2} from "../../components/heading/Heading.tsx";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const SignIn: React.FC = () => {
    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        navigate("/dashboard");
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side */}
            <div className="hidden lg:flex flex-[4] bg-green-100 justify-center items-center">
                <Image path={agricultureImg} altName={"Agriculture"} classes={"w-full h-full object-cover"}/>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="flex flex-[2] justify-center items-center p-8 w-full max-w-2xl pr-40">
                <div className="w-full">
                    <Heading2 name={"Create Your Account"} classes={"text-center ml-40 mb-20"}/>
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
                        <Form.Item<FieldType>
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <AnchorTag href="/forgot-password" name={"forget password?"} classes={"text-blue-500 mb-2 text-right hover:underline block"}/>

                        <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" className={"bg-green-500 w-full"} htmlType="submit">
                                Sign in
                            </Button>
                        </Form.Item>
                        <div className="text-center ml-40 mt-4">
                            <AnchorTag name={"_______________Sign Up_______________"} href={"/signup"} classes={"text-blue-500 hover:underline block mt-2"}/>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
