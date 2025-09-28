"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Spinner } from "../../ui/shadcn-io/spinner";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useDeleteTechstack from "./use-delete-techstack";

interface PropsType {
    toBedeletedTechstackId: number | null;
    setToBedeletedTechstackId : Dispatch<SetStateAction<number | null>>;
}

const DeleteTechstackDialog = ({ toBedeletedTechstackId, setToBedeletedTechstackId } : PropsType) => {
    const {
        handleDeleteTechstack,
        isErrorDeleteTechstack,
        isSuccessDeleteTechstack,
        isPendingDeleteTechstack
    } = useDeleteTechstack();

    const isOpen = toBedeletedTechstackId !== null;

    const onOpenChange = (value: boolean) => {
        if (!value) setToBedeletedTechstackId(null);
    }

    useEffect(() => {
        setToBedeletedTechstackId(null);
    },[isSuccessDeleteTechstack])

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure, my lord?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will weaken our arsenal, dear lord.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPendingDeleteTechstack}>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isPendingDeleteTechstack} onClick={() => handleDeleteTechstack(`${toBedeletedTechstackId}`)}>
                        {isPendingDeleteTechstack && <Spinner variant="ring"/>}
                        Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};


export default DeleteTechstackDialog;
