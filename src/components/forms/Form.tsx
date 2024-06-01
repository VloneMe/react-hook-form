import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type FormFields = z.infer<typeof schema>;

export default function Form() {

  const { 
    register, 
    handleSubmit,
    setError,
    formState: {errors, isSubmitting} 
  } = useForm<FormFields>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // throw new Error();
      console.log(data);
    } catch (error){
        setError("root", {
          message: "This email is in use Already!"
        })
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-300">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[33rem] bg-white/70 shadow-2xl space-y-5 p-8 pb-10 rounded-lg">

          <h1 className="text-3xl font-bold text-center py-4 tracking-widest" 
          >React Hook Form</h1>

          {errors.root && (
            <div className="text-red-500 pt-2 text-sm bg-gray-300 px-4 py-2 rounded-lg font-bold"
            > {errors.root.message} </div>
          )}
          
          <div>
            <Input {...register("email")} 
                    type="text" placeholder="Email" 
                    className="shadow-2xl"
            />
            {errors.email && (
              <div className="text-red-500 pt-2 text-sm"> {errors.email.message} </div>
            )}
          </div>

          <div>
            <Input {...register("password")} 
                    type="password" 
                    placeholder="Password" 
                    className="shadow-2xl"
            />
            {errors.password && (
              <div className="text-red-500 pt-2 text-sm"> {errors.password.message} </div>
            )}
          </div>

          <Button disabled={isSubmitting} type="submit" 
                  className="w-full bg-yellow-800 hover:bg-yellow-700"
          > {isSubmitting ? "Loading..." : "Submit"} </Button>
      </form>
    </div>
  )
}
