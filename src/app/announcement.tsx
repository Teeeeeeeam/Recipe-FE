'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Announcement {
  id: number
  title: string
  content: string
  imgUrl: string
  style: string
  href: string
}

const initialAnnouncements: Announcement[] = [
  {
    id: 0,
    title: '레시피 정보는 요리 공유소에서!',
    content:
      '요리 공유소에 등록된 레시피를 확인하고 나만의 요리 비법을 공유하세요! 😊',
    imgUrl: '/announce1.png',
    style: 'bg-[#E7E0C9]',
    href: 'https://www.notion.so/RecipeRadar-b9702fa8f1cc4b02aa23d14a95dfe071',
  },
  {
    id: 1,
    title: '공지사항을 확인하세요!',
    content: '중요한 업데이트와 이벤트 소식을 놓치지 마세요! 😊',
    imgUrl: '/announce2.png',
    style: 'bg-blue-200',
    href: '/notices',
  },
]

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide()
    }, 7000)

    return () => clearInterval(interval)
  }, [announcements])

  const handleNextSlide = () => {
    if (announcements) {
      setCurrentSlide((prev) => (prev + 1) % announcements.length)
    }
  }

  const handlePrevSlide = () => {
    if (announcements) {
      setCurrentSlide(
        (prev) => (prev - 1 + announcements.length) % announcements.length,
      )
    }
  }

  if (!announcements) return null
  return (
    <div className="h-[240px] bg-white shadow-md relative mx-auto">
      <div className="relative h-full overflow-hidden">
        {announcements.map((announcement, index) => (
          <div
            key={announcement.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'block' : 'hidden'
            } ${announcement.style}`}
          >
            <Link
              href={`${announcement.href}`}
              target={announcement.id === 0 ? '_blank' : '_self'}
            >
              <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr] items-center justify-center px-6 h-full">
                <div className="text-center md:text-left lg:pl-10">
                  <span className="text-blue-50 font-bold block mb-2">
                    NOTICE
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {announcement.title}
                  </h1>
                  <p className="text-gray-700 hidden md:block">
                    {announcement.content}
                  </p>
                </div>
                {announcement.imgUrl && (
                  <div className="relative flex-shrink-0 w-32 h-32 md:w-48 md:h-48">
                    <Image
                      src={announcement.imgUrl}
                      alt="announcement image"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="contain w-auto h-auto"
                      priority
                    />
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 right-3 flex space-x-3 items-center">
        <button
          onClick={handlePrevSlide}
          className="text-gray-700 rounded-full w-6 h-6 flex justify-center items-center focus:outline-none hover:bg-gray-400"
        >
          &#10094;
        </button>
        <div className="text-gray-700 font-semibold">
          {String(currentSlide + 1).padStart(2, '0')}
          {' / '}
          {String(announcements.length).padStart(2, '0')}
        </div>
        <button
          onClick={handleNextSlide}
          className="text-gray-700 rounded-full w-6 h-6 flex justify-center items-center focus:outline-none hover:bg-gray-400"
        >
          &#10095;
        </button>
      </div>
    </div>
  )
}
export default Announcements
