interface Json {
    phone?: number;
    name: string;
    list: List[];
}
interface List {
    cc: number;
    dd: number;
}
interface defaultOptions {
    fKey: string;
    canSkipDealJson?: boolean;
    onJson?: boolean;
    hasJsonOption?: boolean;
    need?: 1 | 2 | 3;
}
