import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner";
import "@/index.css";
import "@/styles.css";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { loginApi } from "@/services/auth.service";
import type { AxiosError } from "axios";

interface SignInFormProp {
  toggleView: () => void;
}

const SigninForm = ({ toggleView }: SignInFormProp) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await loginApi(data);
      const { success, message, tokens, user } = res.data;

      if (!success) {
        toast.error(message);
        return;
      }

      localStorage.setItem("accessToken", tokens.access);
      toast(`Welcome back, ${user.name}`);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  const showValidationErrorToast = () => {
    const errors = form.formState.errors;

    if (errors.email) {
      toast.error(errors.email.message || "Invalid email");
      return;
    }

    if (errors.password) {
      toast.error(errors.password.message || "Invalid password");
      return;
    }

    toast.error("Please fix the errors in the form");
  };
  console.log("FORM ERRORS →", form.formState.errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, showValidationErrorToast)}
        className="active"
        autoComplete="off"
      >
        <p>
          Don't have an account?{" "}
          <button type="button" onClick={toggleView} className="btn">
            Sign up
          </button>
        </p>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <label>Email</label>
              <FormControl>
                <div className="control">
                  <Input
                    {...field}
                    placeholder="youremail@gmail.com"
                    className="h-10 w-full bg-transparent border-0 shadow-none
                           focus-visible:ring-0 focus-visible:ring-offset-0
                           p-0 px-3"
                  />
                  <i className="ai-envelope" />
                </div>
              </FormControl>
              {/* <FormMessage className="text-xs text-red-400"/> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <label>Password</label>
              <FormControl>
                <div className="control">
                  <Input
                    type="password"
                    {...field}
                    placeholder="●●●●●●●●●●●●●●●"
                    className="h-10 w-full bg-transparent border-0 shadow-none
                           focus-visible:ring-0 focus-visible:ring-offset-0
                           p-0 px-3"
                  />
                  <i className="ai-lock-on" />
                </div>
              </FormControl>
              {/* <FormMessage className="text-xs text-red-400"/> */}
            </FormItem>
          )}
        />
        <button type="submit">Sign in</button>
        <p className="footer">
          By clicking Sign In you agree to our terms and conditions, privacy
          policy and reusability rules.
        </p>
      </form>
    </Form>
  );
};

export default SigninForm;
