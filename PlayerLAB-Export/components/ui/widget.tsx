import React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface WidgetProps {
  title?: string
  description?: string
  icon?: LucideIcon
  color?: "cyan" | "purple" | "green" | "yellow" | "pink" | "orange" | "teal" | "indigo" | "amber" | "blue"
  variant?: "default" | "success" | "warning" | "error" | "info"
  size?: "sm" | "md" | "lg"
  className?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  hover?: boolean
  glow?: boolean
}

const colorClasses = {
  cyan: "border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-glow-cyan",
  purple: "border-purple-400/30 hover:border-purple-400/60 hover:shadow-glow-purple",
  green: "border-green-400/30 hover:border-green-400/60 hover:shadow-glow-green",
  yellow: "border-yellow-400/30 hover:border-yellow-400/60 hover:shadow-glow-yellow",
  pink: "border-pink-400/30 hover:border-pink-400/60 hover:shadow-glow-pink",
  orange: "border-orange-400/30 hover:border-orange-400/60 hover:shadow-glow-orange",
  teal: "border-teal-400/30 hover:border-teal-400/60 hover:shadow-glow-teal",
  indigo: "border-indigo-400/30 hover:border-indigo-400/60 hover:shadow-glow-indigo",
  amber: "border-amber-400/30 hover:border-amber-400/60 hover:shadow-glow-amber",
  blue: "border-blue-400/30 hover:border-blue-400/60 hover:shadow-glow-cyan"
}

const variantClasses = {
  default: "bg-white/5",
  success: "bg-green-400/10 border-green-400/30",
  warning: "bg-yellow-400/10 border-yellow-400/30",
  error: "bg-red-400/10 border-red-400/30",
  info: "bg-blue-400/10 border-blue-400/30"
}

const sizeClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8"
}

const iconColorClasses = {
  cyan: "text-cyan-400",
  purple: "text-purple-400",
  green: "text-green-400",
  yellow: "text-yellow-400",
  pink: "text-pink-400",
  orange: "text-orange-400",
  teal: "text-teal-400",
  indigo: "text-indigo-400",
  amber: "text-amber-400",
  blue: "text-blue-400"
}

const iconBgClasses = {
  cyan: "bg-cyan-400/20",
  purple: "bg-purple-400/20",
  green: "bg-green-400/20",
  yellow: "bg-yellow-400/20",
  pink: "bg-pink-400/20",
  orange: "bg-orange-400/20",
  teal: "bg-teal-400/20",
  indigo: "bg-indigo-400/20",
  amber: "bg-amber-400/20",
  blue: "bg-blue-400/20"
}

export function Widget({
  title,
  description,
  icon: Icon,
  color = "cyan",
  variant = "default",
  size = "md",
  className,
  children,
  footer,
  onClick,
  loading = false,
  disabled = false,
  hover = true,
  glow = true
}: WidgetProps) {
  const MotionCard = motion(Card)

  return (
    <MotionCard
      className={cn(
        "backdrop-blur-xl border transition-all duration-300 rounded-2xl",
        variantClasses[variant],
        colorClasses[color],
        sizeClasses[size],
        hover && "hover-lift",
        glow && "hover-glow",
        disabled && "opacity-50 cursor-not-allowed",
        loading && "loading-pulse",
        className
      )}
      whileHover={hover && !disabled ? { scale: 1.02, y: -5 } : undefined}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {(title || Icon) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className={cn("p-3 rounded-xl", iconBgClasses[color])}>
                <Icon className={cn("w-6 h-6", iconColorClasses[color])} />
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-orbitron font-semibold text-white">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-slate-400 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {children && (
        <div className={cn(
          "space-y-4",
          footer && "mb-4"
        )}>
          {children}
        </div>
      )}

      {footer && (
        <div className="pt-4 border-t border-slate-400/20">
          {footer}
        </div>
      )}
    </MotionCard>
  )
}

// Specialized Widget Variants
export function StatsWidget({
  value,
  label,
  change,
  trend,
  icon,
  color = "cyan",
  ...props
}: WidgetProps & {
  value: string | number
  label: string
  change?: string
  trend?: "up" | "down" | "neutral"
}) {
  return (
    <Widget
      color={color}
      icon={icon}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="text-2xl font-orbitron font-bold text-white">{value}</p>
          {change && (
            <p className={cn(
              "text-sm",
              trend === "up" ? "text-green-400" : 
              trend === "down" ? "text-red-400" : 
              "text-slate-400"
            )}>
              {change}
            </p>
          )}
        </div>
      </div>
    </Widget>
  )
}

export function ProgressWidget({
  title,
  progress,
  maxProgress,
  label,
  color = "cyan",
  ...props
}: WidgetProps & {
  progress: number
  maxProgress: number
  label?: string
}) {
  const percentage = (progress / maxProgress) * 100

  return (
    <Widget
      title={title}
      color={color}
      {...props}
    >
      <div className="space-y-3">
        {label && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">{label}</span>
            <span className="text-white">{progress}/{maxProgress}</span>
          </div>
        )}
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              colorClasses[color].split(" ")[0].replace("border-", "bg-").replace("/30", "")
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </Widget>
  )
}

export function ActionWidget({
  title,
  description,
  action,
  icon,
  color = "cyan",
  ...props
}: WidgetProps & {
  action: React.ReactNode
}) {
  return (
    <Widget
      title={title}
      description={description}
      icon={icon}
      color={color}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {props.children}
        </div>
        <div className="ml-4">
          {action}
        </div>
      </div>
    </Widget>
  )
} 