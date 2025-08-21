type EventNames = "submit_report" | "report_received" 
interface EventPayload {
    evt: EventNames,
    payload: Record<string, any>
}

type Products = {
    name:string,
    price: number,
    sizes: string[]
} | string
interface Product{
    name:string,
    price: number,
    sizes: string[],
} 

interface ExtendedProduct extends Product{
    
}