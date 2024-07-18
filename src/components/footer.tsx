import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-[1160px] mx-auto p-4 rounded-lg md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          &copy; 2024{' '}
          <Link
            href="https://indecisive-vertebra-5c0.notion.site/RecipeRadar-a4e3107b5a334bebad464e62b9096af0?pvs=4"
            className="hover:underline"
            target="_blank"
          >
            요리공유소
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 sm:mt-0">
          <li>
            <Link
              href="#"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >
              팀원일
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >
              팀원이
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >
              팀원삼
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:underline dark:text-gray-400"
            >
              팀원사
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
