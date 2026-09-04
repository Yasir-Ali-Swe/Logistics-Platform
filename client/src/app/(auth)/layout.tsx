// Layout.tsx
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full flex justify-center items-center overflow-y-auto py-8">
            {children}
        </div>
    )
}

export default Layout