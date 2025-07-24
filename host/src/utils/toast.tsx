import React from 'react';

import { FaRegCheckCircle } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { IoIosWarning } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';
import { toast } from 'sonner';

export const customToast = (type: string) => {
    switch (type) {
        case 'success':
            return {
                action: {
                    label: <FaXmark className="text-[#000000]" />,
                    onClick: () => toast.dismiss()
                },
                icon: <FaRegCheckCircle className="h-5 w-5 text-green-500" />,
                actionButtonStyle: {
                    backgroundColor: '#fff',
                    color: '#22c55e'
                },
                style: {
                    color: '#22c55e'
                }
            };
        case 'error':
            return {
                action: {
                    label: <FaXmark className="text-[#000000]" />,
                    onClick: () => toast.dismiss()
                },
                icon: <MdErrorOutline className="h-5 w-5 text-red-600" />,
                actionButtonStyle: {
                    backgroundColor: '#fff',
                    color: '#dc2626'
                },
                style: {
                    color: '#dc2626'
                }
            };
        case 'warning':
            return {
                action: {
                    label: <FaXmark className="text-[#000000]" />,
                    onClick: () => toast.dismiss()
                },
                icon: <IoIosWarning className="h-5 w-5 text-yellow-400" />,
                actionButtonStyle: {
                    backgroundColor: '#fff',
                    color: '#facc15'
                },
                style: {
                    color: '#facc15'
                }
            };
    }
};
