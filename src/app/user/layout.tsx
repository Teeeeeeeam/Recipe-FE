const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex h-full justify-center items-center">
      <div className="min-w-[300px] sm:max-w-[320px]">{children}</div>
    </div>
  )
}
export default AuthLayout
