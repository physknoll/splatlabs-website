'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
  tabsClassName?: string
  contentClassName?: string
}

export function Tabs({
  tabs,
  defaultTab,
  className,
  tabsClassName,
  contentClassName,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  return (
    <div className={cn('', className)}>
      {/* Tab List */}
      <div
        className={cn(
          'flex flex-wrap gap-2 p-1.5 bg-light-bg-subtle rounded-xl border border-light-border',
          tabsClassName
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
              activeTab === tab.id
                ? 'text-content-primary'
                : 'text-content-muted hover:text-content-primary hover:bg-white'
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white border border-light-border rounded-lg shadow-soft"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={cn('mt-6', contentClassName)}>
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {tab.content}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
