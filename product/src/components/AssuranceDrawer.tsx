import Image from "next/image";
import { CiCircleCheck } from "react-icons/ci";
import { HiMiniXMark } from "react-icons/hi2";
import { MdOutlineNavigateNext } from "react-icons/md";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import useViewport from "@/hooks/useViewport";

import { Button } from "./ui/button";

function AssuranceDrawer() {
    const { width } = useViewport();
    const isDesktop = width > 1024;

    return (
        <Drawer direction={isDesktop ? "right" : "bottom"}>
            <DrawerTrigger className="w-full text-[10px] md:text-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-1">
                        <Image
                            src={"/icons/assurance.webp"}
                            alt="assurance-icon"
                            width={1000}
                            height={1000}
                            className="h-3 w-3 md:h-5 md:w-5"
                        />

                        <div className="text-xs font-bold md:text-[16px]">
                            Trade Assurance
                        </div>
                    </div>
                    <MdOutlineNavigateNext className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-1 text-left md:mt-1">
                    Built-in order protection service in alibaba.com
                </div>
                <div className="flex items-center md:mt-2">
                    <CiCircleCheck className="mr-1 h-3 w-3 text-primary" />
                    <div>Product quality</div>
                    <CiCircleCheck className="ml-2 mr-1 h-3 w-3 text-primary" />
                    <div>On-time shipment</div>
                </div>
            </DrawerTrigger>
            <DrawerContent className="bg-white lg:ml-[55%] lg:h-full lg:w-[45%] lg:overflow-y-auto lg:overflow-x-hidden lg:rounded-none xl:ml-[calc((100%/3)*2)] xl:w-1/3">
                <DrawerHeader className="relative border-b-[1px] border-[#dddddd]">
                    <DrawerTitle className="text-lg">
                        Trade Assurance
                    </DrawerTitle>
                    <DrawerClose>
                        <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-3 h-8 w-8 text-secondary"
                        >
                            <HiMiniXMark />
                        </Button>
                    </DrawerClose>
                </DrawerHeader>
                <div className="bg-white p-4 md:p-6">
                    <div className="rounded-md bg-[#FFF0E6] p-4 text-[11.5px] md:p-6 md:text-sm">
                        <div className="flex items-center gap-x-2">
                            <Image
                                src={"/icons/assurance.webp"}
                                alt="assurrance-icon"
                                width={1000}
                                height={1000}
                                className="h-6 w-6"
                            />
                            <div className="text-lg md:text-[20px]">
                                Trade Assurance
                            </div>
                        </div>
                        <div className="mt-2 text-[#666666]">
                            {`Alibaba.com's built-in order protection service which protects online
                            orders when payment is made through Alibaba.com.`}
                        </div>
                        <div className="mt-2 text-[#666666]">
                            Trade Assurance reduces risks in:
                        </div>
                        <div className="mt-2 flex items-center">
                            <Image
                                src={"/icons/quality.avif"}
                                alt="assurrance-icon"
                                width={1000}
                                height={1000}
                                className="mr-1 w-6 md:w-8"
                            />
                            <div className="mr-12 mt-1 md:mr-16 md:mt-2">
                                Product quality{" "}
                            </div>
                            <Image
                                src={"/icons/shipment.avif"}
                                alt="assurrance-icon"
                                width={1000}
                                height={1000}
                                className="mr-1 w-6 md:w-8"
                            />
                            <div className="mt-1 md:mt-2">On-time shipment</div>
                        </div>
                    </div>
                    <div className="mt-3 rounded-md bg-[#F7F8FA] p-4 text-[11.5px] md:p-6 md:text-sm">
                        <div className="mb-3 text-sm md:text-[16px]">
                            Secure payment options
                        </div>
                        <div className="flex items-center gap-x-2 border-b-[1px] border-[#dddddd] pb-3 md:gap-x-3">
                            <Image
                                src={"/icons/visa.webp"}
                                alt="payment-icon"
                                width={1000}
                                height={1000}
                                className="w-8 md:w-10"
                            />
                            <Image
                                src={"/icons/master-card.webp"}
                                alt="payment-icon"
                                width={1000}
                                height={1000}
                                className="w-12 md:w-14"
                            />
                            <Image
                                src={"/icons/t-t.webp"}
                                alt="payment-icon"
                                width={1000}
                                height={1000}
                                className="w-5 md:w-7"
                            />
                            <Image
                                src={"/icons/western.webp"}
                                alt="payment-icon"
                                width={1000}
                                height={1000}
                                className="w-[108px] md:w-[122px]"
                            />
                            <Image
                                src={"/icons/boleto.webp"}
                                alt="payment-icon"
                                width={1000}
                                height={1000}
                                className="w-5 md:w-7"
                            />
                        </div>
                        <div className="mt-2 text-sm md:text-[16px]">
                            <div className="font-bold italic text-[#6CAD4E]">
                                Online Bank Payment
                            </div>
                            <div className="mt-0.5 text-xs text-[#666666] md:text-sm">
                                Direct payment from an online Bank.
                            </div>
                            <div className="mt-3 font-bold italic text-[#1E56EF]">
                                Pay Later
                            </div>
                            <div className="mt-0.5 text-xs text-[#666666] md:text-sm">
                                Fast and simple way to finance your order.
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 rounded-md bg-[#F7F8FA] p-4 md:p-6 text-[11.5px] md:text-sm">
                        <div className="text-sm md:text-[16px]">
                            Other trade services
                        </div>
                        <div className="mb-2 mt-3 flex items-center gap-x-2">
                            <Image
                                src={"/icons/logistics.webp"}
                                alt="services-icon"
                                width={1000}
                                height={1000}
                                className="w-5 md:w-7"
                            />
                            <div className="text-sm md:text-[16px]">
                                Alibaba.com Logistics
                            </div>
                        </div>
                        <ol className="text-[#666666]">
                            <li>. Fast ocean and air shipping</li>
                            <li>. Competitive prices</li>
                            <li>. Online tracking</li>
                        </ol>
                        <div className="mb-2 mt-3 flex items-center gap-x-2">
                            <Image
                                src={"/icons/solution.webp"}
                                alt="services-icon"
                                width={1000}
                                height={1000}
                                className="w-5 md:w-7"
                            />
                            <div className="text-sm md:text-[16px]">
                                Inspection Solutions
                            </div>
                        </div>
                        <ol className="text-[#666666]">
                            <li>. Leading inspection companies</li>
                            <li>. Competitive prices</li>
                            <li>. Dedicated one-on-one service</li>
                        </ol>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default AssuranceDrawer;
