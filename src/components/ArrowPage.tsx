import { useRouter } from 'next/navigation'
import React from 'react'
import { IoIosArrowBack , IoIosArrowForward } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'
const ArrowPage = () => {
    const router = useRouter()
  return (
     <div className="md:flex gap-x-3 p-3  items-center hidden">
                    <IoIosArrowBack
                        size={30}
                        onClick={() => router.back()}
                        className={twMerge(
                            `text-neutral-400 
                            hover:text-neutral-300
                            transition cursor-pointer`,
                        )}
                    />
                    <IoIosArrowForward
                        onClick={() => router.forward()}
                        size={30}
                        className={twMerge(
                            `text-neutral-400 hover:text-neutral-300 transition cursor-pointer`
                        )}
                    />
                </div>
  )
}

export default ArrowPage
