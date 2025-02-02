export default function Boxoffice({ money }) {
    return `$${new Intl.NumberFormat('uz-UZ').format(money)}`;
}