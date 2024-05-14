import Link from 'next/link'

export function Header() {
  return (
    <header className="w-full fixed text-gray-600 body-font z-50 ">
      <div className="max-w-[1440px] mx-auto my-0 flex flex-wrap px-3 py-[20px] items-center justify-between bg-[#214D33]">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900"
        >
          Recipe Radar
        </Link>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base ">
          <Link href="/user/login">로그인/회원가입</Link>
        </button>
      </div>
    </header>
  )
}
