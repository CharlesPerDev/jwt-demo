import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ValidationForm = () => {
    const formSchema = z.object({
        jwt: z.string().min(1, { message: "JWT must have at least 1 character" }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [decodedToken, setDecodedToken] = useState();

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsDialogOpen(true);
        console.log(values);
    }

    return (<div>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-10"
            >
                <FormField
                    control={form.control}
                    name="jwt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>JWT</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
                <Button type="submit">Validate</Button>
            </form>
        </Form>
        <div>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Validation information</AlertDialogTitle>
                        <AlertDialogDescription>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
    );
}

export { ValidationForm };