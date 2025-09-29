"use client";

import { useMemo, useState } from "react";
import useTechstack from "./useTechstack";
import { ColumnDef } from "@tanstack/react-table";
import { Techstack as TechstackType } from "@/db/schema/techstacks";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddTechstackDialog from "@/components/techstack/add-techstack-dialog/add-techstack-dialog";
import DeleteTechstackDialog from "@/components/techstack/delete-techstack-dialog/delete-techstack-dialog";
import EditTechstackDialog from "@/components/techstack/edit-techstack-dialog/edit-techstack-dialog";

export default function Techstack() {
    const { techstackData, isPending, isError } = useTechstack();
    const [toBeDeletedTechstackId,setToBeDeletedTechstackId ] =useState<number | null>(null);
    const [toBeEditedTechstack,setToBeEditedTechstack ] =useState<TechstackType | null>(null);

    const columns = useMemo<ColumnDef<TechstackType>[]>(
        () => [
            {
                accessorKey: "name",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Name" />
                ),
            },
            {
                id: "actions",
                header: () => <span>Actions</span>,
                cell: ({ row }) => {
                    const original = row.original;
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() =>
                                        setToBeEditedTechstack(original)
                                    }
                                >
                                    <Edit />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        setToBeDeletedTechstackId(original.id)
                                    }
                                >
                                    <Trash />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ],
        []
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <h1 className="lg:text-3xl font-bold">Tech Stack</h1>
                <AddTechstackDialog />
            </div>
            <DataTable columns={columns} data={techstackData || []} isLoading={isPending}/>
            <DeleteTechstackDialog toBedeletedTechstackId={toBeDeletedTechstackId} setToBedeletedTechstackId={setToBeDeletedTechstackId}/>
            <EditTechstackDialog toBeEditedTechstack={toBeEditedTechstack} setToBeEditedTechstack={setToBeEditedTechstack}/>
        </div>
    );
}
