export interface AccordionProps {
    id: number;
    title: string;
    children: Array<{ title: string; link: string }>;
}