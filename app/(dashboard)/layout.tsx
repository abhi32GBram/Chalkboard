interface DashboardPageProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardPageProps) => {
    return (
        <main>
            {children}
        </main>

    )
}

export default DashboardLayout

