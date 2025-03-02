export default function Icon({ icon, children, vertical = true }:
    { icon: string, children: any, vertical?: boolean }) {
    return <div className="flex data-vertical:flex-col items-center"
        data-vertical={vertical}>
        <div className="text-2xl leading-tight">
            {icon}
        </div>
        <div>
            {children}
        </div>
    </div>
}