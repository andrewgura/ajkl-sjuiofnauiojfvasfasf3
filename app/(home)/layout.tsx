import AuthWrapper from "@/components/AuthWrapper"
import { RootLayoutClient } from "./root-layout-client"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthWrapper>
      <RootLayoutClient>
        {children}
      </RootLayoutClient>
    </AuthWrapper>
  )
}