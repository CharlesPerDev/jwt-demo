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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { generateToken } from "@/components/server/jwtUtils";


const GenerationForm = (props: { setGeneratedJwt: (jwt: string) => void; }) => {
    const formSchema = z.object({
        username: z.string().min(1, { message: "Username must contain at least one character" }).max(128, "Username can't be longer than 128 characters"),
        description: z.string().max(512, { message: "Description can't be longer than 512 characters" }),
        age: z.number().int().finite().max(150, { message: "Age can't be more than 150" }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "John Doe",
            description: "I am a person",
            age: 42,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        void generateToken(values).then((token) => props.setGeneratedJwt(token));
    }

    return (<Form {...form}>
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
            <Button type="submit">Generate</Button>
        </form>
    </Form>);
}

export { GenerationForm };