import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface ButtonProps extends LinkProps{
	children: ReactNode
	className?: string;
	disabled?: boolean
}

const LinkButton: React.FC<ButtonProps> = ({href, children, className, disabled}) => {
	if (disabled) {
		return (
			<div className={`${className} px-4 py-2 bg-slate-900 rounded-md text-sm flex transition-colors items-center`}>{children}</div>
		)
	}
	return (
		<Link href={href} className={className + ' ' + 'px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-md text-sm transition-colors flex items-center'}>{children}</Link>
	)
}

export default LinkButton