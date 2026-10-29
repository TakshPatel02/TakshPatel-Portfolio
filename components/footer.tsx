'use client'
import { BookOpen, Cpu, Clapperboard, Lightbulb } from "lucide-react";
import FlipLink from "./fliplink";
import BridgeIllustration from "./bridge-illustration";
import { siteConfig } from "@/lib/config/site-config";
import Link from "next/link";
import Image from "next/image";
import RotatingTagline from "@/components/rotating-tagline";

const Footer = () => {
    return (
        <>
            <footer className="w-full border-b border-border bg-bg-primary">
                <div className="mx-auto w-full max-w-200 px-4 sm:px-6">
                    <div className="border-x border-border bg-bg-card">
                        <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                            {/* Column 1 (Left - blank on desktop) */}
                            <div className="hidden md:block md:col-span-1 border-r border-border" />

                            {/* Column 2 (Middle - content) */}
                            <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center pt-10 pb-8 px-4">
                                <div className="w-full flex flex-col gap-4 max-w-[320px]">
                                    {/* Crafted by */}
                                    <div className="flex w-full">
                                        <div className="w-[50%] shrink-0 text-right pr-4 text-text-muted font-mono text-xs sm:text-sm">
                                            crafted by
                                        </div>
                                        <div className="flex-1 text-left text-text-secondary font-mono text-xs sm:text-sm">
                                            <a
                                                href={siteConfig.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                                            >
                                                {siteConfig.name}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex w-full">
                                        <div className="w-[50%] shrink-0 text-right pr-4 text-text-muted font-mono text-xs sm:text-sm">
                                            tech stack
                                        </div>
                                        <div className="flex-1 text-left text-text-secondary font-mono text-xs sm:text-sm flex flex-col gap-1">
                                            <a
                                                href="https://nextjs.org"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                                            >
                                                Next JS
                                            </a>
                                            <a
                                                href="https://typescriptlang.org"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                                            >
                                                TypeScript
                                            </a>
                                            <a
                                                href="https://tailwindcss.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                                            >
                                                Tailwind css
                                            </a>
                                            <a
                                                href="https://motion.dev"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                                            >
                                                Motion
                                            </a>
                                        </div>
                                    </div>

                                    {/* Inspired by */}
                                    <div className="flex w-full">
                                        <div className="w-[50%] shrink-0 text-right pr-4 text-text-muted font-mono text-xs sm:text-sm">
                                            inspired by
                                        </div>
                                        <div className="flex-1 text-left text-text-secondary font-mono text-xs sm:text-sm flex flex-col gap-1">
                                            <a
                                                href="https://tailwindcss.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                                            >
                                                tailwind css
                                            </a>
                                            <a
                                                href="https://github.com/ncdai"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                                            >
                                                chanh dai
                                            </a>
                                            <a
                                                href="https://vercel.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                                            >
                                                vercel
                                            </a>
                                            <a
                                                href="https://ramx.in"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                                            >
                                                ramx.in
                                            </a>
                                        </div>
                                    </div>

                                    {/* Deployed on */}
                                    <div className="flex w-full">
                                        <div className="w-[50%] shrink-0 text-right pr-4 text-text-muted font-mono text-xs sm:text-sm">
                                            deployed on
                                        </div>
                                        <div className="flex-1 text-left text-text-secondary font-mono text-xs sm:text-sm">
                                            <a
                                                href="https://vercel.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                                            >
                                                vercel
                                            </a>
                                        </div>
                                    </div>

                                    {/* Source code */}
                                    <div className="flex w-full">
                                        <div className="w-[50%] shrink-0 text-right pr-4 text-text-muted font-mono text-xs sm:text-sm">
                                            source code
                                        </div>
                                        <div className="flex-1 text-left text-text-secondary font-mono text-xs sm:text-sm">
                                            <a
                                                href="https://github.com/TakshPatel02/TakshPatel-Portfolio"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-text-primary transition-colors underline decoration-border/60 hover:decoration-text-primary"
                                            >
                                                github
                                            </a>
                                        </div>
                                    </div>

                                    {/* Licence */}
                                    <div className="flex w-full">
                                        <div className="w-[50%] shrink-0 text-right pr-4 text-text-muted font-mono text-xs sm:text-sm">
                                            licence
                                        </div>
                                        <div className="flex-1 text-left text-text-secondary font-mono text-xs sm:text-sm">
                                            MIT license
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Column 3 (Right - blank on desktop, now has theme-aware easter egg image) */}
                            <div className="hidden md:block md:col-span-1 border-l border-border relative select-none pointer-events-auto z-10">
                                {/* left-0 aligns the bridge to touch the left side border of Column 3 */}
                                <div className="absolute bottom-0 left-0 flex items-end select-none pointer-events-auto">
                                    <BridgeIllustration />
                                </div>
                            </div>
                        </div>

                        {/* Social links row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 w-full border-t border-border">
                            {/* Blank Left spacer on desktop */}
                            <div className="hidden md:block md:col-span-1 border-r border-border" />

                            {/* Social box grid (Middle) */}
                            <div className="col-span-1 md:col-span-2 grid grid-cols-5 w-full font-mono text-xs sm:text-sm">
                                <a
                                    href={siteConfig.links.x}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center py-4 border-r border-border hover:bg-hover-bg hover:text-text-primary text-text-muted transition-colors cursor-pointer group"
                                >
                                    <span className="transition-colors duration-200 group-hover:text-text-primary">x</span>
                                </a>
                                <a
                                    href={siteConfig.links.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center py-4 border-r border-border hover:bg-hover-bg hover:text-text-primary text-text-muted transition-colors cursor-pointer group"
                                >
                                    <span className="transition-colors duration-200 group-hover:text-text-primary">linkedin</span>
                                </a>
                                <a
                                    href={siteConfig.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center py-4 border-r border-border hover:bg-hover-bg hover:text-text-primary text-text-muted transition-colors cursor-pointer group"
                                >
                                    <span className="transition-colors duration-200 group-hover:text-text-primary">github</span>
                                </a>
                                <a
                                    href="/llms.txt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center py-4 border-r border-border hover:bg-hover-bg hover:text-text-primary text-text-muted transition-colors cursor-pointer group"
                                >
                                    <span className="transition-colors duration-200 group-hover:text-text-primary">llms</span>
                                </a>
                                <a
                                    href={`mailto:${siteConfig.links.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center py-4 hover:bg-hover-bg hover:text-text-primary text-text-muted transition-colors cursor-pointer group"
                                >
                                    <span className="transition-colors duration-200 group-hover:text-text-primary">email</span>
                                </a>
                            </div>

                            {/* Blank Right spacer on desktop */}
                            <div className="hidden md:block md:col-span-1 border-l border-border" />
                        </div>
                    </div>
                </div>

            </footer>
            <div className="w-full border-b border-border bg-bg-primary mb-12">
                <div className="mx-auto w-full max-w-200 px-4 sm:px-6">
                    <div className="border border-border border-y-0 bg-bg-card relative">

                        {/* FIG. 02 Label */}
                        <div className="absolute top-3 right-4 font-mono text-[10px] text-text-muted opacity-60 tracking-wider pointer-events-none select-none">
                            FIG. 02
                        </div>

                        {/* Main content row */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 py-8 px-4 sm:px-6">

                            {/* Left Section */}
                            <div className="flex flex-col gap-1.5">
                                <h2 className="font-display font-bold text-text-primary text-xl sm:text-2xl lg:text-3xl">
                                    <FlipLink>{siteConfig.name}</FlipLink>
                                </h2>
                                <p className="font-mono text-sm text-text-secondary overflow-hidden">
                                    <RotatingTagline />
                                </p>
                            </div>

                            {/* Right Section: Social Links */}
                            <div className="flex flex-col gap-2.5 font-mono text-xs sm:text-sm">
                                {siteConfig.features.showResources && (
                                    <Link
                                        href="/resources"
                                        className="flex items-center gap-2 text-text-secondary hover:text-[#ff3366] transition-colors duration-200 group"
                                    >
                                        <BookOpen size={14} className="text-text-muted group-hover:text-[#ff3366] transition-colors duration-200" />
                                        <span>Resources</span>
                                    </Link>
                                )}

                                {siteConfig.features.showSystem && (
                                    <Link
                                        href="/system"
                                        className="flex items-center gap-2 text-text-secondary hover:text-[#ff3366] transition-colors duration-200 group"
                                    >
                                        <Cpu size={14} className="text-text-muted group-hover:text-[#ff3366] transition-colors duration-200" />
                                        <span>System</span>
                                    </Link>
                                )}

                                {siteConfig.features.showMovies && (
                                    <Link
                                        href="/movies"
                                        className="flex items-center gap-2 text-text-secondary hover:text-[#ff3366] transition-colors duration-200 group"
                                    >
                                        <Clapperboard size={14} className="text-text-muted group-hover:text-[#ff3366] transition-colors duration-200" />
                                        <span>Movies</span>
                                    </Link>
                                )}

                                {siteConfig.features.showLessons && (
                                    <Link
                                        href="/lessons"
                                        className="flex items-center gap-2 text-text-secondary hover:text-[#ff3366] transition-colors duration-200 group"
                                    >
                                        <Lightbulb size={14} className="text-text-muted group-hover:text-[#ff3366] transition-colors duration-200" />
                                        <span>Lessons</span>
                                    </Link>
                                )}
                            </div>

                        </div>

                        {/* Bottom Copyright Row */}
                        <div className="border-t border-border py-3 text-center">
                            <p className="text-xs text-text-secondary font-mono">
                                © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                            </p>
                        </div>
                        <div
                            className="fixed bottom-0 left-0 right-0 h-12 pointer-events-none z-45 bg-linear-to-t from-bg-primary via-bg-primary/30 to-transparent backdrop-blur-xs"
                            style={{
                                WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0))",
                                maskImage: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0))",
                            }}
                        />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;