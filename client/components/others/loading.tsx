import SceletLoading from "../loading/loading";
import Root from "@/layouts/root";

export default function PageLoading({ admin }: { admin?: boolean }) {
    return (
        <Root page={admin ? "admin-loading" : "loading"}>
            <main id={admin ? "admin-loader" : ""}>
                <SceletLoading />
            </main>
        </Root>
    )
}
