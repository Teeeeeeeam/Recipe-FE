import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-[1160px] mx-auto p-4 rounded-lg md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          &copy; 2024{' '}
          <Link
            href="https://indecisive-vertebra-5c0.notion.site/RecipeRadar-a4e3107b5a334bebad464e62b9096af0?pvs=4"
            className="hover:text-black"
            target="_blank"
          >
            요리공유소
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 sm:mt-0">
          <li>
            <Link
              href="https://github.com/CHISANW"
              className="mr-4 text-sm text-gray-500 hover:text-black md:mr-6 dark:text-gray-400"
            >
              김민우
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/hopak-e"
              className="mr-4 text-sm text-gray-500 hover:text-black md:mr-6 dark:text-gray-400"
            >
              박상호
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/roel127"
              className="mr-4 text-sm text-gray-500 hover:text-black md:mr-6 dark:text-gray-400"
            >
              양승헌
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400"
            ></Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
