export function toMB(bytes: number): string{
    return `${round2(bytes/1024/1024)}MB`;
}

export function round2(num: number | null): string{
    if(num)
        return num.toFixed(2);
    return 0.0.toFixed(2);
}
