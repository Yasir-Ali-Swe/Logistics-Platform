import React from 'react'
import { ModeToggle } from '@/components/shared/toggle-theme'

const page = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center gap-5'>
      <ModeToggle />
      <h1 className='text-2xl font-bold'>Logistics & Courier Operations</h1>
    </div>
  )
}

export default page