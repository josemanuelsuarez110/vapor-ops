"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Terminal, Github, Server, LayoutDashboard, Settings, User } from "lucide-react"
import { motion } from "framer-motion"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Servers", href: "/servers", icon: Server },
  { name: "Deployments", href: "/deployments", icon: Terminal },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-indigo-600 rounded-lg group-hover:rotate-12 transition-transform">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Vapor<span className="text-indigo-500">Ops</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 text-sm font-medium transition-colors hover:text-white",
                  isActive ? "text-white" : "text-white/60"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-[22px] left-0 right-0 h-[2px] bg-indigo-500"
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-white/60 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 cursor-pointer hover:border-white/20 transition-all">
            <User className="w-5 h-5 text-white/60" />
          </div>
        </div>
      </div>
    </nav>
  )
}
