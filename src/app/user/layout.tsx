const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex items-center min-w-[300px] sm:max-w-[320px] w-full">
      {children}
    </div>
  )
}
export default AuthLayout
