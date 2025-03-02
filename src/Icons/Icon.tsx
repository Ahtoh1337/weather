export default function Icon({ icon, children, vertical }:
    { icon: string, children: any, vertical: boolean }) {
    return <div className="flex data-vertical:flex-col items-center text-center"
        data-vertical={vertical}>
        <div className="text-2xl leading-tight">
            {icon}
        </div>
        <div className="text-sm">
            {children}
        </div>
    </div>
}