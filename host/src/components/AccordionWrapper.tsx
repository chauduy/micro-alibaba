'use client';

import * as React from 'react';
import { useState } from 'react';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import { footerLink } from '@/constants';
import { AccordionProps } from '@/types';

const Accordion = ({
    item,
    i,
    expanded,
    setExpanded
}: {
    item: AccordionProps;
    i: number;
    expanded: number | boolean | null;
    setExpanded: React.Dispatch<React.SetStateAction<boolean | number | null>>;
}) => {
    const isOpen = i === expanded;

    return (
        <div className="mb-4">
            <motion.header
                className="mb-4 flex h-full cursor-pointer items-center justify-between py-2"
                initial={false}
                onClick={() => setExpanded(isOpen ? false : i)}>
                <div className="mt-1 text-[16px] font-medium text-black">{item.title}</div>
                <>
                    {isOpen ? (
                        <MdKeyboardArrowUp className="h-8 w-8 text-black" />
                    ) : (
                        <MdKeyboardArrowDown className="h-8 w-8 text-black" />
                    )}
                </>
            </motion.header>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}>
                        <motion.div
                            className="flex flex-col gap-y-6"
                            variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                            transition={{ duration: 0.8 }}>
                            {item.children.map((child, index) => (
                                <Link
                                    className="text-sm font-medium text-gray-600 hover:font-semibold hover:text-black"
                                    href={child.link}
                                    key={index}
                                    target="_blank">
                                    {child.title}
                                </Link>
                            ))}
                        </motion.div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

export const AccordionWrapper = () => {
    const [expanded, setExpanded] = useState<boolean | number | null>(null);

    return (
        <div className="">
            {footerLink.map((item, index) => (
                <Accordion
                    item={item}
                    key={item.id}
                    i={index}
                    expanded={expanded}
                    setExpanded={setExpanded}
                />
            ))}
        </div>
    );
};
