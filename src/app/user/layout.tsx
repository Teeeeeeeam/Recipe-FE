const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="max-w-[360px] mx-auto">{children}</div>
    </div>
  )
}
export default AuthLayout
