import SceletLoading from "../loading/loading";
import Root from "@/layouts/root";

export default function Loading() {
    return (
        <Root page="loading">
            <main>
                <SceletLoading />
            </main>
        </Root>
    )
}
