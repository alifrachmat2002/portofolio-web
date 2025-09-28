"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import useAddTechstack from "./use-add-techstack";
import { Spinner } from "../../ui/shadcn-io/spinner";
import { cn } from "@/lib/utils";

const AddTechstackDialog = () => {
    const { form, handleAddTechstack, isOpen, onOpenChange, setIsOpen } =
        useAddTechstack();

    return (
        <Dialog onOpenChange={onOpenChange} open={isOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add New</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a Techstack</DialogTitle>
                    <DialogDescription>
                        Add a new weapon to our arsenal, LFG.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleAddTechstack)}
                        className="space-y-4"
                    >
                        <FormField
                            name="name"
                            render={({ field, fieldState: { error } }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className={cn({
                                                "border-destructive": error,
                                            })}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting && (
                                    <Spinner variant="ring" />
                                )}
                                Add
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddTechstackDialog;
