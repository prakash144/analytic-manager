declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";

declare module "*.jsx" {
    import { FunctionComponent } from "react";
    const component: FunctionComponent<Record<string, unknown>>;
    export default component;
}
