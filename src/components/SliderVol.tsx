"use client"

import * as RadixSlider from "@radix-ui/react-slider"
interface SliderProps {
    value?: number,
    onChange?: (value: number) => void
}
const SliderVolume: React.FC<SliderProps> = ({
    value = 1,
    onChange
}) => {

    const handleValueChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    }

    return (
        <RadixSlider.Root className="relative flex items-center h-10 select-none touch-none w-full"
            value={[value]}
            onValueChange={handleValueChange}
            step={0.1}
            min={0}
            max={1}
            aria-label="volume"
        >

            <RadixSlider.Track className="relative h-[5px] grow bg-neutral-600 rounded-full">
                <RadixSlider.Range
                    className="absolute bg-white rounded-full h-full" />
            </RadixSlider.Track>
        </RadixSlider.Root>
    )
}

export default SliderVolume;