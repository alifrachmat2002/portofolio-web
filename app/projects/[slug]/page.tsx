"use client";

import ProjectLayout from "@/components/layouts/ProjectLayout";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PROJECTS } from "@/data/projects";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnjabABKPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [project, setProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.6 },
        },
    };

    useEffect(() => {    
        if (slug && PROJECTS[slug]) {
            setProject(PROJECTS[slug])
            setIsLoading(false)
        }
        else {
            setIsLoading(false);
        }
    },[]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!project || !slug) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                Project not found
                <Link className={buttonVariants({variant:"outline"})} href="/">Back to Home</Link>
            </div>
        );
    }

    return (
        <ProjectLayout title={project.title}>
            <div className="grid gap-12">
                {/* Project header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="space-y-4"
                >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-mono tracking-tight">
                            {project.title}
                        </h1>
                        <Badge
                            variant="outline"
                            className="text-primary border-primary px-3 py-1 text-sm"
                        >
                            {project.year}
                        </Badge>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300 font-mono">
                        {project.shortDescription}
                    </p>
                </motion.div>

                {/* Image carousel */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="bg-white dark:bg-gray-800 rounded-xl border-2 p-4"
                >
                    <Carousel className="w-full">
                        <CarouselContent>
                            {project.images.map(
                                (image: string, index: number) => (
                                    <CarouselItem key={index}>
                                        <div className="relative aspect-video overflow-hidden rounded-lg">
                                            <Image
                                                src={
                                                    image || "/placeholder.svg"
                                                }
                                                alt={`${
                                                    project.title
                                                } screenshot ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                )
                            )}
                        </CarouselContent>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                    </Carousel>
                </motion.div>

                {/* Project details */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Description */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl border-2 p-8"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2 font-mono">
                            Project Overview
                        </h2>
                        <div className="prose dark:prose-invert max-w-none">
                            {project.longDescription
                                .split("\n")
                                .map((paragraph: string, i: number) => (
                                    <p
                                        key={i}
                                        className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed"
                                    >
                                        {paragraph.trim()}
                                    </p>
                                ))}
                        </div>
                    </motion.div>

                    {/* Tech stack and links */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="space-y-8"
                    >
                        {/* Tech stack */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2 font-mono">
                                Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech: string) => (
                                    <Badge
                                        key={tech}
                                        className="bg-primary/10 hover:bg-primary hover:text-white hover:-translate-y-1 text-primary dark:bg-primary/20 px-3 py-1 text-sm transition-all"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2 font-mono">
                                Links
                            </h2>
                            <div className="space-y-4">
                                {project.liveUrl && (
                                    <Button
                                        asChild
                                        className="w-full justify-start"
                                    >
                                        <Link
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            View Live Project
                                        </Link>
                                    </Button>
                                )}
                                {project.repoUrl && (
                                    <Button
                                        variant="outline"
                                        asChild
                                        className="w-full justify-start"
                                    >
                                        <Link
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            View Source Code
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </ProjectLayout>
    );
}
