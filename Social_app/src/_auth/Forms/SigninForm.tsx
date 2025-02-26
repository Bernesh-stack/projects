import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { SigninValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { account } from "@/lib/appwrite/config";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount} = useSignInAccount();

  // ✅ Ensure correct default values in useForm
  const form = useForm<z.infer<typeof SigninValidation>>({

    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const isLogged = await checkAuthUser();
    if (isLogged) {
      toast({ title: "You are already logged in." });
      navigate("/");
      return;
    }
    await account.deleteSession("current")
    console.log("We are here");
    try {
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });
      console.log("session", session);

      if (!session) {
        toast({ title: "Something went wrong. Please log in manually." });
        return;
      }

      const isLoggedIn = await checkAuthUser();
      console.log("isLoggedIn", isLoggedIn);
      if (isLoggedIn) {
        form.reset();
        console.log("navigate");
        navigate("/");
      } else {
        toast({ title: "Signup failed. Please try again." });
      }
    } catch (error) {
      toast({ title: "Error signing in. Please try again." });
      console.error(error);
    }
  }

  if (isUserLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin w-10 h-10" />
          Loading...
        </div>
    );
  }

  return (
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
            {/* ✅ Email Field */}
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel className="shad-form_label">Email</FormLabel>
                      <FormControl>
                        <Input type="email" className="shad-input" {...field} autoComplete="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
            />

            {/* ✅ Password Field */}
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel className="shad-form_label">Password</FormLabel>
                      <FormControl>
                        <Input type="password" className="shad-input" {...field} autoComplete="new-password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
            />

            {/* ✅ Submit Button */}
            <Button type="submit" className="shad-button_primary">
              {isUserLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin w-5 h-5" />
                    Loading...
                  </div>
              ) : (
                  "Sign In"
              )}
            </Button>

            <p className="text-sm text-center text-gray-600 mt-4">
              Don't have an account?
              <Link to="/sign-up" className="text-primary-500 ml-1 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </Form>
  );
};

export default SigninForm;
