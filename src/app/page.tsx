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
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import generateToken from "@/components/server/requestToken";

export default function HomePage() {
  const formSchema = z.object({
    username: z.string().min(1).max(128),
    description: z.string().min(0).max(512),
    age: z.number().int().finite().max(200),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "John Doe",
      description: "I am a person",
      age: 42,
    },
  });

  let [generatedJwt, setGeneratedJwt] = useState("");

  function onSubmit(values: z.infer<typeof formSchema>) {
    generateToken(values).then((token) => setGeneratedJwt(token));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-[#6ed8d8] to-[#00ffaa]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Tabs defaultValue="generation" className="w-full max-w-prose">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="generation">
              Generation
            </TabsTrigger>
            <TabsTrigger className="w-full" value="validation">
              Validation
            </TabsTrigger>
          </TabsList>
          <TabsContent value="generation">
            <div className="flex flex-col gap-8 rounded-lg bg-white p-8 drop-shadow-2xl">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex w-full flex-col gap-10"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(event) =>
                              field.onChange(+event.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
              <div>
                <Label>Result</Label>
                <Textarea
                  readOnly
                  className="resize-none"
                  value={generatedJwt}
                ></Textarea>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
