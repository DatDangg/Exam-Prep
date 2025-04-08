// forms/loginSchema.js
import * as yup from "yup";

export const schema = yup.object().shape({
  username: yup 
    .string()
    .required("Vui lòng nhập họ tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),      
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .test("is-valid-pass", function (value) {
      const input = String(value || "").trim();
      const errors = []
      if (input.length < 6) errors.push("phải có ít nhất 6 kí tự")
      if (!/[A-Z]/.test(input)) errors.push("phải có chữ in hoa");
      if (!/[a-z]/.test(input)) errors.push("phải có chữ thường");
      if (!/[0-9]/.test(input)) errors.push("phải có chữ số");
      if (!/[\W_]/.test(input)) errors.push("phải có ký tự đặc biệt");

      if (errors.length) {
        return this.createError({
          message: `Mật khẩu ${errors.join(', ')}`
        })
      }
      return true
    })
});
