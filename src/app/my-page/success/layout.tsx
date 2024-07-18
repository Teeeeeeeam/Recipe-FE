import MyPageNav from '../../../components/layout/my-page-sidebar'

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative h-full z-20">
      <MyPageNav />
      <div className="w-10/12 mx-auto pt-11 h-full">{children}</div>
    </div>
  )
}
