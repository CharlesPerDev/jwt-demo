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
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { decodeToken } from "@/components/server/jwtUtils";

const ValidationForm = () => {
    const formSchema = z.object({
        jwt: z.string().min(1, { message: "JWT must have at least 1 character" }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [decodedToken, setDecodedToken] = useState({
        isValid: false,
        payload: {
            username: "",
            description: "",
            age: 0,
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        decodeToken(values.jwt).then(x => setDecodedToken(x)).then(() => setIsDialogOpen(true))
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
                <AlertDialogContent className="flex flex-col gap-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Validation information</AlertDialogTitle>
                        <div className="flex flex-col gap-8">
                            <div>
                                <Label htmlFor="username-val">Username</Label>
                                <Input readOnly id="username-val" value={decodedToken.payload.username} />
                            </div>
                            <div>
                                <Label htmlFor="description-val">Description</Label>
                                <Textarea readOnly id="description-val" value={decodedToken.payload.description} />
                            </div>
                            <div>
                                <Label htmlFor="age-val">Age</Label>
                                <Input readOnly id="age-val" value={decodedToken.payload.age} />
                            </div>
                            <p className="text-center">This JWT is {decodedToken.isValid ? <span className="text-green-500 font-bold">Valid</span> : <span className="text-red-500 font-bold">Invalid</span>} according to the server's secret key</p>
                        </div>
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