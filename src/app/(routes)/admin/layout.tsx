//layout for admin routes, this is the parent component for all admin routes
//tailwindcss is used for styling, nextjs is used for routing, framer-motion is used for animations and typescript is used for type checking
// import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
    return <div>{children}</div>;
};

export default AdminLayout;
