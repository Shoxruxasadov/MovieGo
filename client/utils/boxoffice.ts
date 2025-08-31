export default function Boxoffice(money: number): string {
    return `$${new Intl.NumberFormat('uz-UZ').format(money)}`;
}