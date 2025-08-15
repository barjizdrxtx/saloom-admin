import * as React from "react";
import { CustomIcon, IconButton } from "../Icons/Icons";

export const PasswordInput = (props: any) => {
  const { formik, name } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <input
        className="w-full border rounded-md px-3 py-2 text-sm"
        id={name}
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        name={name}
        onChange={formik.handleChange}
        aria-invalid={
          formik.touched.Password && Boolean(formik.errors.Password)
        }
      />
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        {showPassword ? (
          <CustomIcon name="visibility" className="h-5 w-5 text-gray-400" />
        ) : (
          <CustomIcon name="visibility_off" className="h-5 w-5 text-gray-400" />
        )}
      </IconButton>
    </div>
  );
};
