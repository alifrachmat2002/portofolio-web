import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Heart, Menu, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";


export default function Navbar({ variant = "default" } : {variant : "default" | "alternative"}) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        function onScroll() {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll",onScroll);
        }
    },[]);

    return (
        <>
            {/* Navigation */}
            <nav
                className={cn(
                    `fixed w-full backdrop-blur-sm z-10  transition-all`,
                    scrolled ? "dark:bg-gray-900/80 shadow-sm bg-white/80" : ""
                )}
            >
                <div
                    className={cn(
                        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 transition-all ",
                        variant === "default" ? (scrolled ? "justify-between" : "justify-center") : "justify-between"
                    )}
                >
                    <a
                        href="/"
                        className={cn(
                            "text-xl font-bold text-primary transition-all",
                            variant === "default" ? (scrolled ? "visible" : "hidden") : "visible"
                        )}
                    >
                        Alif Rachmat Illahi
                    </a>
                    <div
                        className={cn("flex items-center space-x-4", {
                            "max-md:hidden": scrolled || variant === "alternative",
                        })}
                    >
                        <a
                            href="/#about"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="/#skills"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                        >
                            Skills
                        </a>
                        <a
                            href="/#projects"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                        >
                            Projects
                        </a>
                        <a
                            href="/#contact"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                        >
                            Contact
                        </a>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                            aria-label="Toggle theme"
                        >
                            {mounted && theme === "dark" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>
                    </div>

                    <div className={variant === "alternative" ? "md:hidden" : (scrolled ? "md:hidden" : "hidden")}>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Menu />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <a href="/#about">About</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href="#skills">Skills</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href="#projects">Projects</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href="#contact">Contact</a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>
        </>
    );
}