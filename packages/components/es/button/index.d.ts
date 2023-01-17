import type { Plugin } from "vue";
declare type SFCWithInstall<T> = T & Plugin;
declare const Button: SFCWithInstall<import("vue").DefineComponent<Readonly<import("vue").ComponentPropsOptions<{
    [x: string]: unknown;
}>>, {
    props: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, readonly string[] | Readonly<import("vue").ExtractPropTypes<Readonly<import("vue").ComponentObjectPropsOptions<{
    [x: string]: unknown;
}>>>>, {
    [x: number]: string;
} | {}>>;
export default Button;
