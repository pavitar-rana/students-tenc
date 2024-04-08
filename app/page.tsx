"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRecoilState } from "recoil";
import { sId } from "@/components/recoil-root";

export default function Home() {
  const router = useRouter();

  const [id, setId] = useRecoilState(sId);

  const formSchema = z.object({
    phone: z.string().min(10).max(10),
    password: z.string().min(8),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    var result = await axios.post("/api/login", values);
    console.log(result.data);

    setId(result.data.id);
    router.push(`/dashboard/${result.data.id}`);
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="lg:text-[60px] text-[40px] mt-5">
          TenC Student Login
        </div>
      </div>

      <div>
        <div className="flex justify-center mt-10">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex justify-center flex-col gap-10"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Phone No.</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="9990009990"
                          {...field}
                          className="w-[400px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Login</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
