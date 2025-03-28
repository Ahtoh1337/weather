import { toShortTime } from "../utils"
import Icon from "./Icon"

type WeatherIconProps = {
    value: string | number,
    vertical?: boolean
}

export function HumidityIcon({ value, vertical = true }: WeatherIconProps) {
    return <Icon icon="💧" vertical={vertical}>
        {value}%
    </Icon>
}

export function PrecipitationIcon({ value, vertical = true }: WeatherIconProps) {
    return <Icon icon="☔️" vertical={vertical}>
        {value} mm
    </Icon>
}

export function PrecipitationProbIcon({ value, vertical = true }: WeatherIconProps) {
    return <Icon icon="🌧" vertical={vertical}>
        {value}%
    </Icon>
}

export function UVIndexIcon({ value, vertical = true }: WeatherIconProps) {
    return <Icon icon="☀️" vertical={vertical}>
        {value}/11
    </Icon>
}

export function WindIcon({ speed, direction, vertical = true }: { speed: number, direction: number, vertical?: boolean }) {
    return <Icon icon="💨" vertical={vertical}>
        <WindText speed={speed} direction={direction} />
    </Icon>
}

export function WindText({ speed, direction }: { speed: number, direction: number }) {
    return <>
        {speed} km/h {" "}
        <span className="inline-block"
            style={{ rotate: (direction - 90) + "deg" }}>
            ➤
        </span>
    </>
}

export function CloudIcon({ value, vertical = true }: WeatherIconProps) {
    return <Icon icon="☁️" vertical={vertical}>
        {value}%
    </Icon>
}

export function SunriseIcon({ value, vertical = true }: WeatherIconProps) {
    return <Icon icon="🌅" vertical={vertical}>
        {toShortTime(new Date(value))}
    </Icon>
}

export function SunsetIcon({ value, vertical = true }: WeatherIconProps) {
    return <Icon icon="🌆" vertical={vertical}>
        {toShortTime(new Date(value))}
    </Icon>
}

export function DewPointIcon({ value, vertical = true }: WeatherIconProps) {
    return <Icon icon="💦" vertical={vertical}>
        {value} °C
    </Icon>
}