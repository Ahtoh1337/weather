export default function Icon({ icon, children, vertical }:
    { icon: string, children: any, vertical: boolean }) {
    return <div className="flex group flex-1 data-[vertical=true]:flex-col
    items-center text-center justify-center
    data-[vertical=false]:gap-1"
        data-vertical={vertical}>
        <div className="text-2xl group-data-[vertical=false]:text-base leading-tight">
            {icon}
        </div>
        <div className="text-sm">
            {children}
        </div>
    </div>
}