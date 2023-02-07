'use client' 

import {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import Link, { LinkProps } from 'next/link';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

interface DropdownProps {
	name: string;
	className?: string;
	items: DropdownItem[];
}

export interface DropdownItem {
	href: LinkProps['href'];
	text: string;
}

const Dropdown: React.FC<DropdownProps> = ({className, name, items}) => {
	return (
		<Menu as="div" className={className + " " + "relative inline-block text-left"}>
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-800 bg-slate-600 px-4 py-2 text-sm font-medium shadow-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
					{name}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-12 origin-top-right rounded-md bg-slate-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
						{items.map(item => (
							<Menu.Item key={item.text}>
								{({active}) => (
									<Link
										className="px-2 hover:bg-slate-800 block text-center"
										href={item.href}
										>{item.text}
										</Link>

								)}
							</Menu.Item>
						))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
	)
}

export default Dropdown