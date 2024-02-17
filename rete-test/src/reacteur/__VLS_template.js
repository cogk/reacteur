import ReacteurBasicArrowHead from "./ReacteurBasicArrowHead.vue";
import { __VLS_internalComponent, __VLS_componentsOption, __VLS_name } from "./ReacteurEdge.vue";

function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'ReacteurBasicArrowHead', typeof __VLS_localComponents, "ReacteurBasicArrowHead", "ReacteurBasicArrowHead", "ReacteurBasicArrowHead">;
__VLS_intrinsicElements.svg; __VLS_intrinsicElements.svg;
__VLS_intrinsicElements.g; __VLS_intrinsicElements.g;
__VLS_intrinsicElements.path;
__VLS_intrinsicElements.circle;
__VLS_components.ReacteurBasicArrowHead;
// @ts-ignore
[ReacteurBasicArrowHead,];
{
const __VLS_0 = __VLS_intrinsicElements["svg"];
const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
const __VLS_2 = __VLS_1({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = __VLS_intrinsicElements["g"];
const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
const __VLS_7 = __VLS_6({ ...{}, stroke: ("red"), fill: ("transparent"), "stroke-width": ("3"), "stroke-linejoin": ("round"), "stroke-linecap": ("round"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, stroke: ("red"), fill: ("transparent"), "stroke-width": ("3"), "stroke-linejoin": ("round"), "stroke-linecap": ("round"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
{
const __VLS_10 = __VLS_intrinsicElements["path"];
const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
const __VLS_12 = __VLS_11({ ...{}, d: ((__VLS_ctx.path)), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, d: ((__VLS_ctx.path)), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
}
{
const __VLS_15 = __VLS_intrinsicElements["circle"];
const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
const __VLS_17 = __VLS_16({ ...{}, cx: ((__VLS_ctx.start.x)), cy: ((__VLS_ctx.start.y)), r: ("4"), stroke: ("transparent"), fill: ("black"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{}, cx: ((__VLS_ctx.start.x)), cy: ((__VLS_ctx.start.y)), r: ("4"), stroke: ("transparent"), fill: ("black"), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
}
{
const __VLS_20 = ({} as 'ReacteurBasicArrowHead' extends keyof typeof __VLS_ctx ? { 'ReacteurBasicArrowHead': typeof __VLS_ctx.ReacteurBasicArrowHead; } : typeof __VLS_resolvedLocalAndGlobalComponents).ReacteurBasicArrowHead;
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ ...{}, x: ((__VLS_ctx.end.x)), y: ((__VLS_ctx.end.y)), r: ("10"), fill: ("black"), }));
({} as { ReacteurBasicArrowHead: typeof __VLS_20; }).ReacteurBasicArrowHead;
const __VLS_22 = __VLS_21({ ...{}, x: ((__VLS_ctx.end.x)), y: ((__VLS_ctx.end.y)), r: ("10"), fill: ("black"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{}, x: ((__VLS_ctx.end.x)), y: ((__VLS_ctx.end.y)), r: ("10"), fill: ("black"), });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
}
(__VLS_8.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!: {};
// @ts-ignore
[path, path, start, start, start, start, end, end, end, end, end, end,];
return __VLS_slots;
}
