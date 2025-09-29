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
import useEditTechstack from "./use-edit-techstack";
import { Spinner } from "../../ui/shadcn-io/spinner";
import { cn } from "@/lib/utils";
import { Techstack, TechstackInsert } from "@/db/schema/techstacks";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
    toBeEditedTechstack: Techstack | null,
    setToBeEditedTechstack: Dispatch<SetStateAction<Techstack | null>>
}

const EditTechstackDialog = ({ toBeEditedTechstack, setToBeEditedTechstack } : PropsType) => {
    const { form, mutateEditTechstack, isErrorEditTechstack, isPendingEditTechstack, isSuccessEditTechstack } =
        useEditTechstack();

    const isOpen = toBeEditedTechstack !== null;

    const onOpenChange = (value: boolean) => {
        if (!value) {
            setToBeEditedTechstack(null)
        }
    }

    const handleEditTechstack = async (payload: TechstackInsert) => {
        await mutateEditTechstack({ id: `${toBeEditedTechstack?.id}`, payload: payload});
    }

    useEffect(() => {
        if (isSuccessEditTechstack) {
            setToBeEditedTechstack(null);
        }
    },[isSuccessEditTechstack]);

    useEffect(() => {
        if (toBeEditedTechstack) {
            form.setValue("name", toBeEditedTechstack?.name);
        }
    },[toBeEditedTechstack])

    return (
        <Dialog  open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Techstack</DialogTitle>
                    <DialogDescription>
                        Upgrading our arsenal, chief? Wise choice.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleEditTechstack)}
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
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditTechstackDialog;
