export default function Root({ children, page }: { children: React.ReactNode, page: string }) {
    return <div id={page}>{children}</div>
}
