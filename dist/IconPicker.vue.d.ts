interface Props {
    modelValue?: string;
    value?: string;
    placeholder?: string;
    debounce?: number;
    itemsPerPage?: number;
    paginationText?: string;
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    placeholder: string;
    debounce: number;
    itemsPerPage: number;
    paginationText: string;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string) => void;
    onSelect: (value: string, svg: string) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    placeholder: string;
    debounce: number;
    itemsPerPage: number;
    paginationText: string;
}>>> & Readonly<{
    "onUpdate:modelValue"?: (value: string) => any;
    onOnSelect?: (value: string, svg: string) => any;
}>, {
    placeholder: string;
    debounce: number;
    itemsPerPage: number;
    paginationText: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
