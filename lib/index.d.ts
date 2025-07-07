import { Context, Schema } from 'koishi';
export declare const name = "roblox-group-rankup";
export interface Config {
    Groupid: string;
    Apikey: string;
    IsGroup: Boolean;
}
export declare const Config: Schema;
export declare function apply(ctx: Context, config: Config): void;
