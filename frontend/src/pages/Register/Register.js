import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Register.module.css";
import { registerSchema } from "../../utils/schema";
import ValidatedInput from "../../components/ValidateInput/ValidateInput";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Register() {
    const navigate = useNavigate()
    const { register: registerUser, isAuthenticated } = useAuth()

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onSubmit",
    });
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }
    const onSubmit = async (data) => {
        try {
            console.log(data)
            await registerUser(data);
            alert("Đăng ký thành công!");
            navigate("/");
        } catch (err) {
            console.error("Lỗi khi đăng ký:", err);
            alert("Đăng ký thất bại. Vui lòng thử lại!");
        }
    };

    return (
        (!isAuthenticated) &&
        <div className={styles.register}>
            <div className="container mb-5">
                <div className={`row ${styles.form}`}>
                    <div className={`col-lg-5 col-md-7 ${styles.heading}`}>
                        Đăng ký hệ thống thi
                    </div>
                    <form
                        className={`col-lg-5 col-md-7 ${styles.input}`}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={styles.formGroup}>
                            <label>Họ tên</label>
                            <ValidatedInput
                                name="username"
                                placeholder="Nhập họ tên"
                                register={register}
                                trigger={trigger}
                                error={errors.username}
                                inputClassName={styles.formGroupInput}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Địa chỉ email</label>
                            <ValidatedInput
                                name="email"
                                placeholder="Nhập email"
                                register={register}
                                trigger={trigger}
                                error={errors.email}
                                inputClassName={styles.formGroupInput}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Mật khẩu</label>
                            <ValidatedInput
                                name="password"
                                placeholder="Nhập mật khẩu"
                                register={register}
                                trigger={trigger}
                                error={errors.password}
                                inputClassName={styles.formGroupInput}
                            />
                        </div>
                        <button type="submit" className={styles.button}>
                            Đăng ký
                        </button>
                    </form>
                    <div className={`col-lg-5 col-md-7 ${styles.noti}`}>
                        Nếu bạn đã có tài khoản, vui lòng
                        <Link to='/login'> đăng nhập tại đây, </Link>
                        hoặc
                        <Link to='/'> quay lại trang chủ tại đây.</Link>
                    </div>
                </div>
                {/* Light dark toggle  */}
                <div className={`${styles.toggleTheme}`}>
                    <div className={`${styles.theme}`}>
                        <svg viewBox="0 0 64 64" stroke="currentColor" strokeWidth="2">
                            <path d="M32.1318512,18.2793007c-7.7119007,0-13.9863014,6.2743988-13.9863014,13.9862976s6.2744007,13.9864006,13.9863014,13.9864006s13.9862976-6.274498,13.9862976-13.9864006S39.84375,18.2793007,32.1318512,18.2793007z M32.1318512,44.2793007c-6.6245003,0-12.0137005-5.3897018-12.0137005-12.0137024s5.3892002-12.0135975,12.0137005-12.0135975s12.0136986,5.3895988,12.0136986,12.0135975S38.7563515,44.2793007,32.1318512,44.2793007z" />
                            <path d="M32.0000496,13.1688995c0.5522003,0,1-0.4471998,1-1V1c0-0.5527-0.4477997-1-1-1c-0.5522995,0-1,0.4473-1,1v11.1688995C31.0000496,12.7216997,31.4477501,13.1688995,32.0000496,13.1688995z" />
                            <path d="M32.0000496,50.830101c-0.5522995,0-1,0.4472008-1,1V63c0,0.5527,0.4477005,1,1,1c0.5522003,0,1-0.4473,1-1V51.830101C33.0000496,51.2773018,32.5522499,50.830101,32.0000496,50.830101z" />
                            <path d="M62.263649,30.4452991H51.09375c-0.5522003,0-1,0.4473-1,1s0.4477997,1.0000019,1,1.0000019h11.169899c0.5522995,0,1-0.4473019,1-1.0000019S62.8159485,30.4452991,62.263649,30.4452991z" />
                            <path d="M13.90625,31.4452991c0-0.5527-0.447794-1-0.999999-1H1.7363508c-0.5523,0-1,0.4473-1,1s0.4477,1.0000019,1,1.0000019H12.906251C13.458456,32.4453011,13.90625,31.9979992,13.90625,31.4452991z" />
                            <path d="M45.1801491,19.8778992c0.2559013,0,0.5116997-0.097599,0.7070999-0.2929001l7.8988991-7.8984995c0.3906021-0.3905993,0.3906021-1.0233994,0-1.4139996c-0.3905983-0.3907003-1.0234985-0.3907003-1.4140968,0l-7.8989029,7.8984003c-0.3905983,0.3906002-0.3905983,1.0233994,0,1.4140987C44.668457,19.7803001,44.9243507,19.8778992,45.1801491,19.8778992z" />
                            <path d="M45.887249,45.2030983c-0.3906975-0.3905983-1.0234985-0.3905983-1.4141006,0c-0.3905983,0.3907013-0.3905983,1.0235023,0,1.4141006l7.8989029,7.8973999c0.1952972,0.1954002,0.4511986,0.2929993,0.7070999,0.2929993c0.2557983,0,0.5116997-0.097599,0.7069969-0.2929993c0.3906021-0.3905983,0.3906021-1.0233994,0-1.4139977L45.887249,45.2030983z" />
                            <path d="M18.112751,19.5849991c0.1954002,0.1953011,0.4511986,0.2929001,0.7070999,0.2929001c0.2558002,0,0.5116997-0.097599,0.7069988-0.2929001c0.3906059-0.3906994,0.3906059-1.0234985,0-1.4140987L11.6289501,10.2725c-0.3906994-0.3907003-1.0234947-0.3907003-1.4140997,0c-0.3906002,0.3906002-0.3906002,1.0234003,0,1.4139996L18.112751,19.5849991z" />
                            <path d="M19.5712509,45.2700996c-0.0177002-0.0208015-0.024601-0.0471992-0.0444012-0.0670013c-0.3906002-0.3905983-1.0233936-0.3905983-1.4140987,0l-3.9401007,3.9400024l-4.0341949,3.8446999c-0.3999052,0.3811989-0.415205,1.0139008-0.0339994,1.4137993c0.0192947,0.0203018,0.045495,0.0278015,0.066,0.0460014c0.0176945,0.0208969,0.0245943,0.0472984,0.0443945,0.0669975c0.1953001,0.1954002,0.4512005,0.2929993,0.7069998,0.2929993c0.2559004,0,0.5117006-0.097599,0.7070999-0.2929993l3.9401007-3.9398994l4.0341997-3.8446999c0.3999004-0.3811989,0.415205-1.0139008,0.0340004-1.4137993C19.6179504,45.2958984,19.5917511,45.2882996,19.5712509,45.2700996z" />
                        </svg>
                        Light
                    </div>
                    <div className={`${styles.theme}`}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="currentColor"
                                d="M11.0174 2.80157C6.37072 3.29221 2.75 7.22328 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C16.7767 21.25 20.7078 17.6293 21.1984 12.9826C19.8717 14.6669 17.8126 15.75 15.5 15.75C11.4959 15.75 8.25 12.5041 8.25 8.5C8.25 6.18738 9.33315 4.1283 11.0174 2.80157ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C12.7166 1.25 13.0754 1.82126 13.1368 2.27627C13.196 2.71398 13.0342 3.27065 12.531 3.57467C10.8627 4.5828 9.75 6.41182 9.75 8.5C9.75 11.6756 12.3244 14.25 15.5 14.25C17.5882 14.25 19.4172 13.1373 20.4253 11.469C20.7293 10.9658 21.286 10.804 21.7237 10.8632C22.1787 10.9246 22.75 11.2834 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z"
                            />
                        </svg>
                        Dark
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
