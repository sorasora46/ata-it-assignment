import { forwardRef } from 'react';
import { IoCalendarOutline } from 'react-icons/io5';

type CustomDatePickerProps = {
    value?: string;
    onClick?: () => void;
    placeholder?: string;
};

const CustomDatePicker = forwardRef<HTMLInputElement, CustomDatePickerProps>(({ value, onClick, placeholder }, ref) => (
    <div className="relative w-40">
        <input
            ref={ref}
            onClick={onClick}
            value={value}
            placeholder={placeholder ?? 'Select date'}
            readOnly
            className="border py-1 px-3 pr-8 w-full cursor-pointer rounded-md"
        />
        <IoCalendarOutline
            fontSize={18}
            className="text-[#0169c5] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
        />
    </div>
));

CustomDatePicker.displayName = 'CustomDateInput';
export default CustomDatePicker;
